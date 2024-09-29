import { useState } from 'react'
import { fetchPreference, updatePreference } from '../services/api'

export const usePreference = () => {
  const [preferences, setPreferences] = useState<any[]>([]) // You can define a specific type if needed
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const getPreferences = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPreference()
      setPreferences(data)
    } catch (err) {
      setError('Failed to fetch preferences')
    } finally {
      setLoading(false)
    }
  }

  // Upload a file to update preferences
  const uploadFile = async (file: File) => {
    setLoading(true)
    setError(null)
    try {
      const responseMessage = await updatePreference(file)
      setMessage(responseMessage)
      getPreferences() // Optionally refetch preferences after successful upload
    } catch (err) {
      setError('Failed to upload file')
    } finally {
      setLoading(false)
    }
  }

  return {
    preferences,
    loading,
    error,
    message,
    getPreferences,
    uploadFile
  }
}
