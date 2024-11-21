import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'

interface ButtonProps {
  onPress: () => void
  label: string
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}

export const Button = ({
  onPress,
  label,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-200 active:bg-gray-300'
      case 'danger':
        return 'bg-red-500 active:bg-red-600'
      default:
        return 'bg-blue-500 active:bg-blue-600'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-3'
      case 'lg':
        return 'py-4 px-6'
      default:
        return 'py-3 px-4'
    }
  }

  const getTextStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'text-gray-800'
      default:
        return 'text-black'
    }
  }

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-lg'
      default:
        return 'text-base'
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        rounded-md
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${disabled ? 'opacity-50' : 'opacity-100'}
        items-center
        justify-center
        flex-row
        ${className}
      `}
    >
      {loading && (
        <ActivityIndicator size="small" color={variant === 'secondary' ? '#1F2937' : '#BBF246'} className="mr-2" />
      )}
      <Text
        className={`
          font-medium
          ${getTextStyles()}
          ${getTextSize()}
        `}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
