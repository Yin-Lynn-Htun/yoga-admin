// firebase/bookings.ts
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { db } from '@/firebaseConfig'
import { generateUUID } from '@/utils'
import { collection, addDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

export const useCreateBooking = () => {
  const { cartItems, clearCart } = useCart()
  const cartId = generateUUID()
  const { user } = useAuth()

  const handleBooking = async (classId: number, userId: string): Promise<string> => {
    try {
      const bookingRef = collection(db, 'bookings')
      const newBooking: Omit<Booking, 'id' | 'class'> = {
        classId,
        userId,
        cartId: cartId,
        createdAt: Date.now(),
      }

      const docRef = await addDoc(bookingRef, newBooking)
      return docRef.id
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  }

  const createBooking = async () => {
    if (!user) {
      Alert.alert('Error', 'Please login to proceed with checkout')
      return
    }

    const bookingPromises = cartItems.map((item) => handleBooking(item.id, user.uid))

    await Promise.all(bookingPromises)
    clearCart()

    Alert.alert('Success', 'Your booking has been confirmed!')
  }

  return createBooking
}

export const getUserBookings = async (userId: string): Promise<BookingWithClass[]> => {
  try {
    const bookingsRef = collection(db, 'bookings')
    const q = query(bookingsRef, where('userId', '==', userId))
    const querySnapshot = await getDocs(q)

    const promises = querySnapshot.docs.map(async (d) => {
      const bookingData = { id: d.id, ...d.data() } as Booking

      const docRef = doc(db, 'classes', bookingData.classId.toString())
      const classDoc = await getDoc(docRef)
      const classData = classDoc.data() as YogaClass

      return { class: classData, ...bookingData }
    })

    return await Promise.all(promises)
  } catch (error) {
    throw error
  }
}

export const useFetchBooking = () => {
  const [bookings, setBookings] = useState<BookingWithClass[]>([])
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBookings = async () => {
      if (!user) return

      try {
        const userBookings = await getUserBookings(user.uid)
        setBookings(userBookings)
      } catch (error) {
        Alert.alert('Error', 'Failed to load bookings')
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [])

  return {
    bookings,
    isLoading,
  }
}
