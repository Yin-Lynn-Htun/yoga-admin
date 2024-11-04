import ClassItem from '@/components/ClassItem'
import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import useClass from '@/hooks/useClass'
import { Feather } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIME_OF_DAY = ['Morning (5AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-9PM)', 'Night (9PM-5AM)']

const FilterBottomSheet = React.forwardRef(
  (
    {
      onApplyFilters,
    }: {
      onApplyFilters: (filters: any) => void
    },
    ref
  ) => {
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [selectedTimes, setSelectedTimes] = useState<string[]>([])
    const { dismiss } = useBottomSheetModal()

    const toggleDay = (day: string) => {
      setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
    }

    const toggleTime = (time: string) => {
      setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
    }

    const handleApply = () => {
      onApplyFilters({ selectedDays, selectedTimes })
      dismiss()
    }

    const clearFilters = () => {
      setSelectedDays([])
      setSelectedTimes([])
    }

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index)
    }, [])

    return (
      <BottomSheetModal
        onChange={handleSheetChanges}
        ref={ref as any}
        containerStyle={{
          backgroundColor: '#161622',
        }}
      >
        <BottomSheetView className="h-max border-2 bg-primary p-4 borde">
          <View className="flex flex-col">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-semibold text-white">Filters</Text>
              <TouchableOpacity onPress={clearFilters}>
                <Text className="text-blue-400">Clear All</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-medium text-white mb-4">Days of Week</Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {DAYS_OF_WEEK.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedDays.includes(day) ? 'bg-secondary' : 'border-gray-400'
                  }`}
                >
                  <Text className={`${selectedDays.includes(day) ? 'text-white' : 'text-gray-300'}`}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-lg font-medium text-white mb-4">Time of Day</Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {TIME_OF_DAY.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => toggleTime(time)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedTimes.includes(time) ? 'bg-secondary' : 'border-gray-400'
                  }`}
                >
                  <Text className={`${selectedTimes.includes(time) ? 'text-white' : 'text-gray-300'}`}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={handleApply} className="bg-secondary py-3 rounded-lg mt-auto">
              <Text className="text-white text-center font-semibold">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  }
)

const Class = () => {
  const { classes, loading, refetchClass } = useClass()

  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setRefreshing] = React.useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{ selectedDays: string[]; selectedTimes: string[] }>({
    selectedDays: [],
    selectedTimes: [],
  })

  const onRefresh = async () => {
    setRefreshing(true)
    await refetchClass()

    setRefreshing(false)
  }

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters)
  }

  const filteredClasses = classes.filter((classItem) => {
    const matchesDay =
      activeFilters.selectedDays.length === 0 || activeFilters.selectedDays.includes(classItem.course.dayOfWeek)

    const matchesTime =
      activeFilters.selectedTimes.length === 0 ||
      activeFilters.selectedTimes.some((timeRange: any) => {
        return isWithinTimeRange(classItem.course.timeOfCourse, timeRange)
      })

    const matchesQuery = classItem.className.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesDay && matchesTime && matchesQuery
  })
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  return (
    <SafeAreaView className="bg-primary min-h-full">
      <GestureHandlerRootView className="flex-1 bg-primary">
        <BottomSheetModalProvider>
          <FlatList
            data={filteredClasses}
            // data={[{ id: 'header' }]}
            stickyHeaderIndices={[0]}
            keyExtractor={(item: any) => item?.id}
            ListEmptyComponent={() => <EmptyState title="No Classes Found" />}
            renderItem={({ item }: { item: YogaClass | { id: string } }) => {
              return <ClassItem key={item.id} {...(item as YogaClass)} course={(item as YogaClass).course} />
            }}
            ListHeaderComponent={() => (
              <View className="bg-primary">
                <View className="flex py-6 px-4">
                  <View className="flex flex-row gap-6 items-center">
                    <View className="w-full flex-1">
                      <SearchInput
                        initialQuery={searchQuery}
                        placeholder="Search classes"
                        onSearch={(query) => setSearchQuery(query)}
                      />
                    </View>

                    <TouchableOpacity onPress={handlePresentModalPress}>
                      <View className="relative">
                        <Feather name="filter" size={26} color="white" />
                        {(activeFilters.selectedDays.length > 0 || activeFilters.selectedTimes.length > 0) && (
                          <View className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full" />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          />

          <FilterBottomSheet ref={bottomSheetModalRef} onApplyFilters={handleApplyFilters} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default Class

const isWithinTimeRange = (classTime: string, timeRange: string): boolean => {
  // Split the time string into hours and minutes
  const [hours, minutes] = classTime.split(':').map(Number)

  // Handle invalid time format
  if (isNaN(hours) || isNaN(minutes)) {
    return false
  }
  console.log(hours, timeRange, 'hours')

  switch (timeRange) {
    case 'Morning (5AM-12PM)':
      return hours >= 5 && hours < 12
    case 'Afternoon (12PM-5PM)':
      return hours >= 12 && hours < 17
    case 'Evening (5PM-9AM)':
      return hours >= 17 && hours < 21
    case 'Night (9PM-5AM)':
      return hours >= 21 || hours < 5
    default:
      return false
  }
}
