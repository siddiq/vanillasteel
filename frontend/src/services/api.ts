const API_BASE_URL = ''

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchPreference = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/preference`)
    if (!response.ok) {
      throw new Error('Failed to fetch preference')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching preference:', error)
    throw error
  }
}

export const updatePreference = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch('/v1/preference/upload-csv', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const result = await response.json()
      return result.message
    } else {
      return 'Failed to upload the file.'
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    return 'An error occurred during file upload.'
  }
}
