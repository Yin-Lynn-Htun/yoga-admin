import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../constants/images'
import CustomButton from '@/components/CustomButton'
import { useAuth } from '@/contexts/AuthContext'
// import { useGlobalContext } from '@/contexts/GlobalProvider'

const Index = () => {
  const { user, loading } = useAuth()

  if (!loading && user) {
    return <Redirect href={'/class'} />
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          {/* <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" /> */}
          <Text className="text-3xl font-dsemibold text-secondary font-bold text-center">Universal Yoga</Text>

          <Image source={images.onboarding} className="w-full border-2 h-[500px]" resizeMode="contain" />

          <View className="relative mt-5">
            <Text className="text-3xl font-dregular text-black font-bold text-center">
              Start with Fresh <Text className="text-secondary-200">Mind!</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          {!loading && (
            <CustomButton
              title="Continue with Email"
              handlePress={() => {
                router.push('/sign-in')
              }}
              containerStyles="w-full mt-10"
            />
          )}
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#BBF246" style="light" />
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
