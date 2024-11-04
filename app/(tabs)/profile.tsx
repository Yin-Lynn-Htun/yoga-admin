import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '@/components/EmptyState'
import { useAuth } from '@/contexts/AuthContext'
import { useAuthentication } from '@/hooks/useAuthentication'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'
import BookingsScreen from '@/components/Booking'
import { useFetchBooking } from '@/hooks/useBooking'
import { router } from 'expo-router'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { formatTimestampToDate } from '@/utils'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import handleSubmitReview from '@/lib/firebase'

const BookingItem = ({ item }: { item: BookingWithClass }) => {
  const { user } = useAuth()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleSubmit = async (rating: number, review: string, bookingId: string, classId: number) => {
    try {
      console.log(
        {
          rating,
          review,
          classId,
          userId: user?.uid!,
          bookingId,
        },
        'iddds'
      )
      await handleSubmitReview(rating, review, classId, user?.uid!, bookingId)
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.')
    }
  }

  return (
    <>
      <View className="bg-primary-800 rounded-xl p-4 mb-4 flex-row gap-2">
        <View className="flex-1">
          <Text className="text-white font-psemibold">{item.class.className}</Text>
          <View className="flex gap-3 flex-row items-center">
            <View className="w-[24px] h-[24px] flex justify-center items-center rounded-full">
              <Fontisto name="date" size={16} color="white" />
            </View>
            <Text className="font-pregular text-sm text-white">{formatTimestampToDate(item.class.date)}</Text>
          </View>

          <View className="flex gap-3 flex-row items-center">
            <View className="w-[24px] h-[24px] flex justify-center items-center rounded-full">
              <Fontisto name="person" size={16} color="white" />
            </View>
            <Text className="font-pregular text-sm text-white">{item.class.teacher}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handlePresentModalPress()
          }}
          className="bg-secondary p-2 rounded-lg self-end justify-end"
        >
          <Text className="text-xs font-psemibold text-white">Rate class</Text>
        </TouchableOpacity>
      </View>
      <ReviewBottomSheet
        onSubmit={handleSubmit}
        classId={item.class.id}
        bookingId={item.id}
        ref={bottomSheetModalRef}
      />
    </>
  )
}

const profile = () => {
  const { userProfile } = useAuth()
  const { logout } = useAuthentication()
  const { bookings, isLoading } = useFetchBooking()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <GestureHandlerRootView className="flex-1 bg-primary">
        <BottomSheetModalProvider>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <BookingItem key={item.id} item={item} />}
            ListEmptyComponent={() => (
              <EmptyState title="There is no booking yet!" subtitle="No bookings found for this profile" />
            )}
            ListHeaderComponent={() => (
              <View className="w-full flex justify-center items-center mt-6 px-4">
                <TouchableOpacity onPress={handleLogout} className="flex w-full items-end mb-10">
                  <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" tintColor={'white'} />
                </TouchableOpacity>

                <View className="w-24 h-24 rounded-full border border-secondary flex justify-center items-center">
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                    className="w-[90%] h-[90%] rounded-full"
                    resizeMode="cover"
                  />
                </View>

                <InfoBox title={userProfile?.username ?? ''} containerStyles="mt-5  " titleStyles="text-lg" />
                <InfoBox title={userProfile?.email ?? ''} titleStyles="text-gray-400" />

                <Text className="font-psemibold text-lg self-start mt-10 text-white">Your bookings</Text>
              </View>
            )}
          />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const ReviewBottomSheet = React.forwardRef(
  (
    {
      onSubmit,
      bookingId,
      classId,
    }: {
      onSubmit: (rating: number, review: string, bookingId: string, classId: number) => Promise<void>
      bookingId: string
      classId: number
    },
    ref
  ) => {
    const { dismiss } = useBottomSheetModal()
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

    const handleSubmit = async () => {
      await onSubmit(rating, review, bookingId, classId)
      setRating(0)
      setReview('')
      dismiss()
    }

    return (
      <BottomSheetModal
        ref={ref as any}
        containerStyle={{
          backgroundColor: '#161622',
        }}
      >
        <BottomSheetView className="h-[50vh] border-2 bg-primary p-4 borde">
          <View className="flex-1 bg-primary p-4">
            <Text className="text-xl font-semibold text-white mb-6">Leave a review</Text>

            {/* Rating Stars */}
            <View className="flex-row justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <AntDesign
                    name="star"
                    size={32}
                    color={star <= rating ? '#FFD700' : '#4B5563'}
                    fill={star <= rating ? '#FFD700' : 'none'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-xs text-white">Write a review</Text>
            <TextInput
              className="bg-primary-800 text-white border-2 border-gray-400 mt-2 p-4 rounded-lg min-h-[100px] mb-6"
              placeholder="Write your review here..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={review}
              onChangeText={setReview}
              textAlignVertical="top"
            />

            <TouchableOpacity
              className={`py-3 rounded-lg ${rating === 0 ? 'bg-gray-500' : 'bg-secondary'}`}
              onPress={handleSubmit}
              disabled={rating === 0}
            >
              <Text className="text-white text-center font-semibold">Submit Review</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  }
)

export default profile
