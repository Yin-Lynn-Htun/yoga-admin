import { db } from '@/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Alert } from 'react-native'

interface ReviewData {
  userId: string
  bookingId: string
  classId: number
  rating: number
  review: string
  createdAt: any
}

const handleSubmitReview = async (
  rating: number,
  review: string,
  classId: number,
  userId: string,
  bookingId: string
) => {
  try {
    // Validate inputs
    if (!rating || !classId || !userId || !bookingId) {
      throw new Error('Missing required fields')
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    // Prepare review data
    const reviewData: ReviewData = {
      userId,
      bookingId,
      classId,
      rating,
      review: review.trim(),
      createdAt: serverTimestamp(),
    }

    // Add document to 'reviews' collection
    const reviewsRef = collection(db, 'reviews')
    const docRef = await addDoc(reviewsRef, reviewData)

    Alert.alert('Success', 'Thank you for your review!')

    // Return the document ID in case it's needed for further operations
    return docRef.id
  } catch (error) {
    console.error('Error submitting review:', error)

    throw error // Re-throw the error for handling by the caller if needed
  }
}

export default handleSubmitReview
