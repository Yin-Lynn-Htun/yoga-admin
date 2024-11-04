import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

type Props = {
  title: string
  handlePress: () => void
  containerStyles?: string
  textStyles?: string
  isLoading?: boolean
}

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: Props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl py-4 gap-3 flex flex-row justify-center items-center ${containerStyles}`}
      disabled={isLoading}
    >
      {isLoading && (
        <View>
          <ActivityIndicator className="text-black-100 scale-125" />
        </View>
      )}
      <Text className={`text-black font-dsemibold text-base ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
