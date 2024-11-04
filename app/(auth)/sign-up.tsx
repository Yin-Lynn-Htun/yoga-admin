import { useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native'

import { images } from '../../constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'
import { useAuthentication } from '@/hooks/useAuthentication'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { validateUsername } from '@/utils'

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')

  const { username, email, password, confirmPassword } = form

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return false
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return false
    }
    setPasswordError('')
    return true
  }

  const { signup } = useAuthentication()

  const handleSignup = async () => {
    if (!validatePassword()) return

    const usernameError = validateUsername(username)
    if (usernameError) {
      setPasswordError(usernameError)
      return
    }

    setSubmitting(true)

    try {
      const userCredential = await signup(email, password)

      // Store additional user data in Firestore
      if (userCredential) {
        await setDoc(doc(db, 'users', userCredential.uid), {
          username,
          email,
          createdAt: new Date().toISOString(),
        })
      }
      router.push('/sign-in')
    } catch (err: any) {
      Alert.alert('Error', err.message)
    } finally {
      setSubmitting(false)
    }
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
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[34px]" />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Sign Up to Aora</Text>
          {passwordError && <Text className="text-red-400 mt-4">{passwordError}</Text>}

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="default"
          />

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
            otherStyles="mt-7"
            keyboardType="password"
          />

          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <CustomButton title="Sign Up" handlePress={handleSignup} containerStyles="mt-7" isLoading={isSubmitting} />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
