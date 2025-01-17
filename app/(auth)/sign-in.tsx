import { View, Text, ScrollView, Dimensions, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import FormField from '@/components/FormField'
import React, { useState } from 'react'
import { useAuthentication } from '@/hooks/useAuthentication'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const { login } = useAuthentication()

  const handleLogin = async () => {
    setSubmitting(true)
    try {
      await login(form.email, form.password)
      router.push('/class')
    } catch (err: any) {
      Alert.alert('Error', err.message)
    }
    setSubmitting(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-black mt-10 font-dsemibold">Log in</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            keyboardType="password"
            otherStyles="mt-7"
          />

          <CustomButton title="Sign In" handlePress={handleLogin} containerStyles="mt-7" isLoading={isSubmitting} />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-gray-500 font-dregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-dsemibold text-secondary">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
