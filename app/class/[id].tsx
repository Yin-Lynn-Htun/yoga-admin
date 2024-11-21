import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { formatTimestampToDate } from '@/utils'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useCart } from '@/contexts/CartContext'
import { useClassDetail } from '@/hooks/useClass'

const ClassDetailScreen = () => {
  const params = useLocalSearchParams()
  const classId = params.id as string

  const { addToCart, removeFromCart, cartItems } = useCart()
  const isAlreadyInCart = cartItems.some((item) => item.id.toString() === classId)

  const { classDetail, loading } = useClassDetail({ classId })

  if (loading || !classDetail) {
    return (
      <ScrollView className="min-full bg-primary grid place-items-center">
        <ActivityIndicator size="large" color="#your-accent-color" />
      </ScrollView>
    )
  }

  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="relative">
        <Image
          source={
            classDetail.course?.imageBase64
              ? { uri: `data:image/jpeg;base64,${classDetail.course?.imageBase64}` }
              : {
                  uri: 'https://images.unsplash.com/photo-1730484976453-c6657e01df5c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }
          }
          className="w-full h-80"
          resizeMode="cover"
        />

        <TouchableOpacity
          className="absolute top-10 left-4 bg-black/30 p-2 rounded-full"
          onPress={() => router.navigate('/class')}
        >
          <Fontisto name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View className="px-4 py-6">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-dbold text-lg text-black mb-4">{classDetail.className}</Text>
          <Text className="px-2 py-1 rounded-lg font-dsemibold bg-secondary text-sm text-black">
            {classDetail.course.typeOfClass}
          </Text>
        </View>

        <View className="flex-row items-center mb-4">
          <Text className="font-dsemibold text-black">{classDetail.course?.timeOfCourse}</Text>
          <View className="w-[2px] h-4 bg-black mx-3" />
          <Text className="font-dsemibold text-gray-400">{classDetail.course?.duration} mins</Text>
        </View>

        <View className="flex gap-1 mb-4">
          <View className="flex-row items-center">
            <View className="w-[24px] h-[24px] justify-center items-center rounded-full mr-3">
              <Fontisto name="date" size={16} color="black" />
            </View>
            <Text className="font-dregular text-black">
              {classDetail.course?.dayOfWeek}, {formatTimestampToDate(classDetail.date)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-[24px] h-[24px] justify-center items-center rounded-full mr-3">
              <MaterialCommunityIcons name="yoga" size={20} color="black" />
            </View>
            <Text className="font-dregular text-black">Teacher {classDetail.teacher}</Text>
          </View>

          <View className="flex-row items-center">
            <View className="w-[24px] h-[24px] justify-center items-center rounded-full mr-3">
              <Ionicons name="pricetag-sharp" size={16} color="black" />
            </View>
            <Text className="font-dregular text-black">£{classDetail.course.pricePerClass}</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-[24px] h-[24px] justify-center items-center rounded-full mr-3">
              <Fontisto name="person" size={16} color="black" />
            </View>
            <Text className="font-dregular text-black">{classDetail.availableSpots} pax left</Text>
          </View>
        </View>

        <View className="w-full h-[1px] bg-gray-300 my-6" />

        <View>
          <Text className="font-dsemibold text-black">About the class</Text>
          <Text className="font-dregular text-gray-500">{classDetail.course?.description}</Text>
        </View>

        <View className="mt-3">
          <Text className="font-dsemibold text-black">Things to bring</Text>
          <Text className="font-dregular text-gray-500">{classDetail.course?.thingsToBring}</Text>
        </View>

        <View className="mt-3">
          <Text className="font-dsemibold text-black">Additional comments</Text>
          <Text className="font-dregular text-gray-500">{classDetail.comments}</Text>
        </View>

        <View className="mt-3">
          <Text className="font-dsemibold text-black">Difficulty</Text>
          <Text className="font-dregular text-gray-500">{classDetail.course.difficultyLevel}</Text>
        </View>

        {isAlreadyInCart ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => removeFromCart(classId)}
            className="w-full bg-secondary-100 py-3 rounded-xl mt-6"
          >
            <Text className="text-black text-center font-dsemibold">Remove from Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => addToCart(classDetail)}
            className="w-full bg-secondary-100 py-3 rounded-xl mt-6"
          >
            <Text className="text-black text-center font-dsemibold">Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

export default ClassDetailScreen
