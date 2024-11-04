import { useEffect, useState } from 'react'

const useAppwrite = (fn) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await fn()
      if (!res) {
        throw new Error('Failed to fetch data')
      }

      setData(res)
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return {
    data,
    refetch,
    isLoading,
  }
}

export default useAppwrite
