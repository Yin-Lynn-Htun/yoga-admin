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

        <View className="w-full h-60 rounded-xl  relative flex justify-center items-center">
          <Image
            source={
              course?.imageBase64
                ? { uri: `data:image/jpeg;base64,${course?.imageBase64}` }
                : {
                    uri: 'https://images.unsplash.com/photo-1730484976453-c6657e01df5c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }
            }
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        </View>

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
