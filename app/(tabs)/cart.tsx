// CartScreen.tsx
import EmptyState from '@/components/EmptyState'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useCreateBooking } from '@/hooks/useBooking'
import { formatTimestampToDate, getShortDay } from '@/utils'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, RefreshControl, Alert, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const CartItem = (item: any) => {
  const { removeFromCart } = useCart()
  return (
    <View key={item.id} className=" rounded-xl p-4 mb-4">
      <View className="flex flex-row gap-3">
        <Image
          source={
            item?.course?.imageBase64
              ? { uri: `data:image/jpeg;base64,${item?.course?.imageBase64}` }
              : {
                  uri: 'https://images.unsplash.com/photo-1730484976453-c6657e01df5c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }
          }
          className="w-28 aspect-square rounded-xl"
          resizeMode="cover"
        />

        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-black font-dsemibold text-lg">{item.className}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id.toString())}>
              <Fontisto name="shopping-basket-remove" size={20} color={'#ef4444'} />
            </TouchableOpacity>
          </View>

          <View>
            <View className="flex flex-row gap-3 items-center mb-2">
              <Fontisto name="date" size={16} color="black" />
              <Text className="text-gray-500">
                {getShortDay(item.course?.dayOfWeek)}, {formatTimestampToDate(item.date)}
              </Text>
            </View>

            <View className="flex flex-row gap-3 items-center">
              <Ionicons name="pricetag-sharp" size={20} color="black" />
              <Text className="text-gray-500">£{item.course?.pricePerClass}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const CartScreen = () => {
  const { cartItems } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth() // Get current user from your auth context
  const createBooking = useCreateBooking()

  const totalPrice = cartItems.reduce((acc, item) => acc + item.course?.pricePerClass, 0)

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1">
        {/* Add this wrapper */}
        <FlatList
          className="px-2 py-5 mb-20"
          data={cartItems}
          keyExtractor={(item: any) => item?.id}
          ListEmptyComponent={() => <EmptyState title="There is no item in your cart!" subtitle="" type="cart" />}
          renderItem={({ item }: { item: YogaClass }) => {
            return <CartItem key={item.id} {...item} />
          }}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <Text className="text-lg font-dregular text-gray-500">Your Cart</Text>
            </View>
          )}
        />

        {cartItems.length > 0 && (
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-primary">
            <TouchableOpacity
              className="bg-secondary-100 px-3 py-3 rounded-xl"
              onPress={() => {
                createBooking()
              }}
            >
              <View className="flex flex-row justify-between">
                <Text className="bg-black px-3 rounded-lg text-secondary text-center font-dsemibold">
                  {cartItems.length}
                </Text>
                <Text className="text-black text-center font-dsemibold">Proceed to Book</Text>
                <Text className="text-black text-center font-dsemibold">£{totalPrice}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default CartScreen
