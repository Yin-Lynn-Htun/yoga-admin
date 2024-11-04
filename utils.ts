/**
 * Converts a timestamp to a formatted date string (e.g., "DD MMM").
 * @param {number} timestamp - The timestamp in milliseconds.
 * @returns {string} - The formatted date string (e.g., "04 Nov").
 */
export const formatTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp)

  // Format the date as "DD MMM" (e.g., "04 Nov")
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  })
}

// src/utils/validation.ts
export const validateUsername = (username: string) => {
  if (username.length < 3) {
    return 'Username must be at least 3 characters long'
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters'
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores'
  }
  return null
}

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const daysMap = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
}

export const getShortDay = (day: keyof typeof daysMap) => {
  return daysMap[day] || day // Fallback to the original day if not found
}
