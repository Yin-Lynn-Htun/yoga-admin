import { db } from '@/firebaseConfig'
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useClass = () => {
  const [classes, setClasses] = useState<YogaClass[]>([])
  const [loading, setLoading] = useState(true)

  const fetchClasses = async () => {
    try {
      const classesCol = collection(db, 'classes')
      const snapshot = await getDocs(classesCol)
      const classesPromises = snapshot.docs.map(async (d) => {
        const classData = d.data() as YogaClass

        const docRef = doc(db, 'courses', classData.courseId.toString())
        const courseDoc = await getDoc(docRef)
        const courseData = courseDoc.data()

        return {
          ...classData,
          course: courseDoc.exists() ? { ...courseData } : undefined,
        } as YogaClass
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
