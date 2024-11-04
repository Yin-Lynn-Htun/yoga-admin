import { View, Text } from 'react-native'

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}: {
  title: string
  subtitle?: string
  containerStyles?: string
  titleStyles?: string
}) => {
  return (
    <View className={containerStyles}>
      {subtitle && <Text className="text-sm text-gray-100 text-center font-dregular">{subtitle}</Text>}
      <Text className={`text-black text-center font-dsemibold ${titleStyles}`}>{title}</Text>
    </View>
  )
}

export default InfoBox
