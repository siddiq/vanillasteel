import React, { useEffect, useState } from 'react'
import { usePreference } from '../hooks/usePreference'
import { fetchProductsMatchedBtPreference } from '../services/api'
import { Product } from '../types'
import { WrapperProductsTable } from '../components/products-table/ProductsTable'

export const Search: React.FC = () => {
  const [products, setProducts] = useState([] as Product[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const preferenceHook = usePreference()

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        await preferenceHook.getPreferences()

        setProducts(await fetchProductsMatchedBtPreference())

        setError(null)
      } catch (err) {
        setError(new Error('Failed to fetch products'))
      } finally {
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <md-circular-progress indeterminate></md-circular-progress>
      </div>
    )
  }

  if (error) {
    return (
      <div className="backend-error">
        <p>
          <md-typography>Network Error: Unable to fetch data.</md-typography>
        </p>
        <p>
          {/* <md-filled-button onClick={reloadProducts}>Retry</md-filled-button> */}
        </p>
      </div>
    )
  }

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
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

    await preferenceHook.uploadFile(selectedFile)
    setProducts(await fetchProductsMatchedBtPreference())
  }

  const preferencesAreAvailable =
    preferenceHook.preferences && preferenceHook.preferences.length > 0

  return (
    <div>
      <h1>Search Page</h1>
      <p>
        {preferencesAreAvailable
          ? 'Current preferece has ' +
            preferenceHook.preferences.length +
            ' rules'
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
      {preferenceHook.message && <p>{preferenceHook.message}</p>}
      {error && <p style={{ color: 'red' }}>{preferenceHook.error}</p>}

      {preferencesAreAvailable ? (
        <WrapperProductsTable products={products} />
      ) : null}
    </div>
  )
}
