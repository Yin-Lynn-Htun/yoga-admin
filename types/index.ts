type YogaClass = {
  className: string
  comments: string
  courseId: number
  date: number
  id: number
  teacher: string
  course: Course
}

type ClassWithCourseAndBooking = YogaClass & {
  totalBookings: number
}

type Course = {
  capacity: number
  courseName: string
  createdAt: string
  dayOfWeek: string
  description: string
  difficultyLevel: string
  duration: number
  id: number
  imageBase64: ImageBitmap
  pricePerClass: number
  thingsToBring: string
  timeOfCourse: string
  typeOfClass: string
}

type Booking = {
  id: string
  classId: number
  userId: string
  cartId: string
  createdAt: number
}

type BookingWithClass = Booking & {
  class: Omit<YogaClass, 'Course'>
}

interface ClassDetail {
  availableSpots: number
  className: string
  comments: string
  course: Course
  courseId: number
  date: number // Consider using Date if you want to handle date objects
  id: number
  teacher: string
  totalBookings: number
}
