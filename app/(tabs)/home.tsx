// import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import SearchInput from '@/components/SearchInput'
// import { images } from '@/constants'
// import EmptyState from '@/components/EmptyState'
// import { getAllPosts } from '@/lib/appwrite'
// import Trending from '@/components/Trending'
// import useAppwrite from '@/lib/useAppwrite'
// import VideoCard from '@/components/VideoCard'
// import { useAuth } from '@/contexts/AuthContext'
// import { useAuthentication } from '@/hooks/useAuthentication'
// import { router } from 'expo-router'

// const Home = () => {
//   const { userProfile } = useAuth()
//   const { logout } = useAuthentication()

//   const [isRefreshing, setRefreshing] = React.useState(false)
//   const { data, isLoading, refetch } = useAppwrite(getAllPosts)

//   const onRefresh = async () => {
//     setRefreshing(true)
//     await refetch()

//     setRefreshing(false)
//   }

//   const handleLogout = async () => {
//     try {
//       await logout()
//       router.push('/')
//     } catch (error) {
//       console.error('Logout error:', error)
//     }
//   }

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <FlatList
//         data={data}
//         // data={[]}
//         keyExtractor={(item: any) => item?.$id}
//         renderItem={({ item }: any) => (
//           <VideoCard
//             title={item.title}
//             thumbnail={item.thumbnail}
//             video={item.video}
//             creator={item.creator.username}
//             avatar={item.creator.avatar}
//           />
//         )}
//         ListEmptyComponent={() => (
//           <EmptyState title="No Videos Found" subtitle="Be be the first one to upload the video." />
//         )}
//         ListHeaderComponent={() => (
//           <View className="flex my-6 px-4 space-y-6">
//             <View className="flex justify-between items-start flex-row mb-6">
//               <View>
//                 <Text className="font-dmedium text-sm text-gray-100">Welcome Back</Text>
//                 <Text className="text-2xl font-dsemibold text-black">{userProfile?.username || 'User'}</Text>
//               </View>

//               <View className="mt-1.5">
//                 <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
//               </View>
//             </View>

//             <View className="w-full flex-1 pt-5 pb-8">
//               <Text className="text-lg font-dregular text-gray-100 mb-3">Latest Videos</Text>
//               <Trending posts={data} />
//             </View>
//           </View>
//         )}
//         refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
//       />
//     </SafeAreaView>
//   )
// }

// export default Home
