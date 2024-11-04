import { db } from '@/firebaseConfig'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useClass = () => {
  const [classes, setClasses] = useState<ClassWithCourseAndBooking[]>([])
  const [loading, setLoading] = useState(true)

  const fetchClasses = async () => {
    try {
      const classesCol = collection(db, 'classes')
      const snapshot = await getDocs(classesCol)
      const classesPromises = snapshot.docs.map(async (d) => {
        const classData = d.data()

        const docRef = doc(db, 'courses', classData.courseId.toString())
        const courseDoc = await getDoc(docRef)
        const courseData = courseDoc.data()

        // Fetch total bookings for capacity calculation
        const bookingsRef = collection(db, 'bookings')
        const bookingsQuery = query(bookingsRef, where('classId', '==', classData.id))
        const bookingsSnapshot = await getDocs(bookingsQuery)
        const totalBookings = bookingsSnapshot.size

        return {
          ...classData,
          totalBookings,
          course: courseDoc.exists() ? { ...courseData } : undefined,
        } as ClassWithCourseAndBooking
      })

      const classList = await Promise.all(classesPromises)
      setClasses(classList)
    } catch (error) {
      console.error('Error fetching classes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const refetchClass = async () => {
    fetchClasses()
  }

  return {
    classes,
    loading,
    refetchClass,
  }
}

export default useClass

export const useClassDetail = ({ classId }: { classId: string }) => {
  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClassDetail = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch class document
      const classDocRef = doc(db, 'classes', classId)
      const classDoc = await getDoc(classDocRef)

      if (!classDoc.exists()) {
        throw new Error('Class not found')
      }

      const classData = classDoc.data() as YogaClass

      // Fetch associated course data
      const courseDocRef = doc(db, 'courses', classData.courseId.toString())
      const courseDoc = await getDoc(courseDocRef)

      // Fetch total bookings for capacity calculation
      const bookingsRef = collection(db, 'bookings')
      const bookingsQuery = query(bookingsRef, where('classId', '==', classId))
      const bookingsSnapshot = await getDocs(bookingsQuery)
      const totalBookings = bookingsSnapshot.size

      // Combine all the data
      const completeClassData = {
        ...classData,
        id: classDoc.id,
        course: courseDoc.exists() ? { ...courseDoc.data() } : undefined,
        availableSpots: courseDoc.exists() ? (courseDoc.data()?.capacity || 0) - totalBookings : 0,
        totalBookings,
      } as any

      setClassDetail(completeClassData)
    } catch (err) {
      console.error('Error fetching class detail:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch class details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (classId) {
      fetchClassDetail()
    }
  }, [classId])

  const refetchClassDetail = () => {
    fetchClassDetail()
  }

  return {
    classDetail,
    loading,
    error,
    refetchClassDetail,
  }
}
