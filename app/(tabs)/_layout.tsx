import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

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
    title: 'Home',
    component: 'home',
    icon: icons.home,
  },
  {
    title: 'Bookmark',
    component: 'bookmark',
    icon: icons.bookmark,
  },
  {
    title: 'Create',
    component: 'create',
    icon: icons.plus,
  },
  {
    title: 'Profile',
    component: 'profile',
    icon: icons.profile,
  },
]

const TabsLayout = () => {
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
            name={tab.component}
            options={{
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={tab.icon} color={color} name={tab.title} focused={focused} />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  )
}

export default TabsLayout
