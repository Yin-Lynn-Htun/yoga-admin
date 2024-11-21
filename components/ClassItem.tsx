import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { formatTimestampToDate } from '@/utils'
import Fontisto from '@expo/vector-icons/Fontisto'
import { useCart } from '@/contexts/CartContext'

const ClassItem = ({
  className,
  comments,
  courseId,
  date,
  id,
  teacher,
  course,
  totalBookings,
}: ClassWithCourseAndBooking) => {
  const { addToCart, removeFromCart, cartItems } = useCart()

  const handleAddToCart = () => {
    addToCart({ className, comments, courseId, date, id, teacher, course })
  }

  const isAlreadyInCart = cartItems.some((item) => item.id == id)

  return (
    <TouchableOpacity onPress={() => router.push(`/class/${id}`)}>
      <View className="flex flex-col items-center px-4 mb-14">
        {/* @ts-ignore */}
        {course?.imageBase64 && (
          <View className="w-full h-60 rounded-xl  relative flex justify-center items-center">
            <Image
              source={{ uri: `data:image/jpeg;base64,${course?.imageBase64}` }}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          </View>
        )}

        <View className="flex flex-row mt-5 gap-3 items-start px-3">
          <View className="flex flex-col text-black flex-1 gap-3">
            <View className="flex items-center flex-row gap-3 ">
              <Text className="font-dsemibold text-sm text-black">{course?.timeOfCourse}</Text>
              <View className="w-[2px] h-4/5 bg-black"></View>
              <Text className="font-dsemibold text-sm text-gray-400">{course?.duration} mins</Text>
            </View>

            <View className="flex flex-row justify-between items-center flex-1 gap-y-1">
              <Text className="font-dsemibold text-sm text-black">{className}</Text>
              <Text className="font-dsemibold text-sm text-black">
                {course?.capacity - totalBookings} / {course?.capacity} left
              </Text>
              {/* <Text className="font-dsemibold text-sm text-black">course?.capacity - totalbooking / {course?.capacity} left</Text> */}
            </View>

            <View className="flex gap-3 flex-row items-center">
              <View className="w-[24px] h-[24px] flex justify-center items-center rounded-full">
                <Fontisto name="date" size={16} color="black" />
              </View>
              <Text className="font-dregular text-sm text-black">
                {course?.dayOfWeek}, {formatTimestampToDate(date)}
              </Text>
            </View>

            <View className="flex gap-3 flex-row items-center">
              <View className="w-[24px] h-[24px] flex justify-center items-center rounded-full">
                <Fontisto name="person" size={16} color="black" />
              </View>
              <Text className="font-dregular text-sm text-black">{teacher}</Text>
            </View>
          </View>
        </View>

        {isAlreadyInCart ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => removeFromCart(id.toString())}
            className="w-full bg-secondary-100 py-2 rounded-xl mt-3 relative flex justify-center items-center"
          >
            <Text className="text-black text-sm font-dsemibold">Remove from Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleAddToCart}
            className="w-full bg-secondary-100 py-2 rounded-xl mt-3 relative flex justify-center items-center"
          >
            <Text className="text-black text-sm font-dsemibold">Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ClassItem
