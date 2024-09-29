import React, { useState } from 'react'
import { fetchPreference, updatePreference } from '../services/api'

export const Search: React.FC = () => {
  // State to hold the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Get the first file
    if (file) {
      setSelectedFile(file) // Update the state with the selected file
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFile) {
      alert('Please select a file first.')
      return
    }

    const message = await updatePreference(selectedFile)
    setMessage(message)
  }

  return (
    <div>
      <h1>Search Page</h1>

      {/* Form to handle file uploads */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput">Upload CSV File:</label>
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <button type="submit">Upload</button>
        </div>
      </form>

      {/* Display the response message */}
      {message && <p>{message}</p>}
    </div>
  )
}
