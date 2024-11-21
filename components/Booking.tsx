import { useFetchBooking } from '@/hooks/useBooking'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'

const BookingsScreen = () => {
  const { bookings, isLoading } = useFetchBooking()

  return (
    <View className="flex-1 bg-primary-900 px-4 pt-4">
      {isLoading ? (
        <ActivityIndicator size="large" color="#your-accent-color" />
      ) : (
        <ScrollView>
          {bookings.map((booking) => (
            <View key={booking.id} className="bg-primary-800 rounded-xl p-4 mb-4">
              <Text className="text-black font-dsemibold">Booking ID: {booking.id}</Text>
              <Text className="text-gray-300">Class ID: {booking.classId}</Text>
              <Text className="text-gray-300">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default BookingsScreen
