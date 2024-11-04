import { router } from 'expo-router'
import { View, Text, Image } from 'react-native'

import { images } from '../constants'
import CustomButton from './CustomButton'

const EmptyState = ({ title, subtitle, type }: { title: string; subtitle?: string; type: 'class' | 'cart' }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <View className="py-10">
        <Image
          source={type === 'class' ? images.emptyClass : images.emptyCart}
          resizeMode="contain"
          tintColor={type === 'class' ? undefined : '#192126'}
          className="w-[270px] h-[216px]"
        />
      </View>

      <Text className="text-sm font-dmedium text-gray-400">{title}</Text>
      <Text className="text-xl text-center font-dsemibold text-black mt-2">{subtitle}</Text>
    </View>
  )
}

export default EmptyState
