import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'
import { useCart } from '@/contexts/CartContext'

type Props = {
  icon: any
  color: string
  name: string
  focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: Props) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className={`${focused ? 'font-dsemibold' : 'font-dregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TABS = [
  {
    title: 'Class',
    component: 'class',
    icon: icons.classImg,
  },
  {
    title: 'Cart',
    component: 'cart',
    icon: icons.cart,
  },
  {
    title: 'Profile',
    component: 'profile',
    icon: icons.profile,
  },
]

const TabsLayout = () => {
  const { getCartCount } = useCart()

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#BBF246',
          tabBarInactiveTintColor: '#ffffff7e',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#192126',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          },
        }}
      >
        {TABS.map((tab) => (
          <Tabs.Screen
            key={tab.title}
            name={tab.component}
            options={({ navigation }) => ({
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => {
                return tab.component === 'cart' ? (
                  <View className="flex items-center justify-center gap-2">
                    <Image source={tab.icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
                    {getCartCount() > 0 && (
                      <View className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                        <Text className="text-black text-xs font-bold">{getCartCount()}</Text>
                      </View>
                    )}
                    <Text
                      className={`${focused ? 'font-dsemibold' : 'font-dregular'} text-xs`}
                      style={{ color: color }}
                    >
                      {tab.title}
                    </Text>
                  </View>
                ) : (
                  <TabIcon icon={tab.icon} color={color} name={tab.title} focused={focused} />
                )
              },
            })}
          />
        ))}
      </Tabs>
    </>
  )
}

export default TabsLayout
