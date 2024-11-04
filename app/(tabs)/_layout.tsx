import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'
import { Ionicons } from '@expo/vector-icons'
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
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
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
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#161622',
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
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="mr-4">
              //     <View className="relative">
              //       <Ionicons name="cart-outline" size={24} color="black" />
              //       {getCartCount() > 0 && (
              //         <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
              //           <Text className="text-white text-xs">{getCartCount()}</Text>
              //         </View>
              //       )}
              //     </View>
              //   </TouchableOpacity>
              // ),
              tabBarIcon: ({ color, focused }) => {
                return tab.component === 'cart' ? (
                  <View className="flex items-center justify-center gap-2">
                    <Image source={tab.icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
                    {getCartCount() > 0 && (
                      <View className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                        <Text className="text-white text-xs font-bold">{getCartCount()}</Text>
                      </View>
                    )}
                    <Text
                      className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
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
