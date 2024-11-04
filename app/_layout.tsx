import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import '../global.css'
import { Client, Account, ID } from 'react-native-appwrite'
import GlobalProvider from '@/contexts/GlobalProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'DMSans-Black': require('../assets/fonts/DMSans-Black.ttf'),
    'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf'),
    'DMSans-ExtraBold': require('../assets/fonts/DMSans-ExtraBold.ttf'),
    'DMSans-ExtraLight': require('../assets/fonts/DMSans-ExtraLight.ttf'),
    'DMSans-Light': require('../assets/fonts/DMSans-Light.ttf'),
    'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-SemiBold': require('../assets/fonts/DMSans-SemiBold.ttf'),
    'DMSans-Thin': require('../assets/fonts/DMSans-Thin.ttf'),
  })

  useEffect(() => {
    const client = new Client().setProject('6727048e002c193fc027').setPlatform('com.yinlynnhtun.aora')
  }, [])

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null

  return (
    <AuthProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="class/[id]" options={{ headerShown: false }} />
        </Stack>
      </CartProvider>
    </AuthProvider>
  )
}
