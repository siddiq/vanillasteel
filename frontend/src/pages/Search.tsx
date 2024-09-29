import React, { useEffect, useState } from 'react'
import { usePreference } from '../hooks/usePreference'

export const Search: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { preferences, loading, error, message, getPreferences, uploadFile } =
    usePreference()

  useEffect(() => {
    getPreferences()
  }, [])

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log('File changed', file)
    if (file) {
      setSelectedFile(file)
    }
  }

  // Handle form submission for file upload
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFile) {
      alert('Please select a file first.')
      return
    }

    uploadFile(selectedFile)
  }

  return (
    <div>
      <h1>Search Page</h1>
      <p>
        {preferences
          ? 'Current preferece has ' + preferences.length + ' rules'
          : 'No preference file uploaded yet'}
      </p>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="fileInput">Upload new CSV File:</label>
        </p>
        <p>
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hide the input
          />

          <md-filled-button
            onClick={(e: Event) => {
              document.getElementById('fileInput')?.click()
              e.preventDefault()
            }}
          >
            Choose File
          </md-filled-button>
        </p>
        <p>
          {selectedFile ? (
            <span>Selected file: {selectedFile.name}</span>
          ) : (
            <span>No file selected</span>
          )}
        </p>

        <p>
          <md-filled-button
            type="submit"
            disabled={!selectedFile ? true : null}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </md-filled-button>
        </p>
      </form>

      {/* Display message or error */}
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
