// const API_BASE_URL = 'your_api_base_url'
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
