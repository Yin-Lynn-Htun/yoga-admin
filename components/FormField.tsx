import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType = 'default',
  ...props
}: {
  title: string
  value: string
  handleChangeText: (text: string) => void
  placeholder?: string
  otherStyles?: string
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'password'
  props?: any
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-sm text-black-100 font-dmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-white rounded-2xl border-2 border-black-100/50 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-dsemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={keyboardType === 'password' && !showPassword}
          {...props}
        />

        {keyboardType === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
