import { useState, useEffect, useRef } from 'react'
import { fetchProducts } from '../services/api'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [reloadTrigger, setReloadTrigger] = useState(false)
  const mounted = useRef(false)

  const getProducts = async () => {
    console.log('getProducts')
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(new Error('Failed to fetch products'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('useEffect', mounted.current, reloadTrigger)
    // Prevent double fetch on initial mount due to Strict Mode
    if (!mounted.current || reloadTrigger) {
      getProducts()
      mounted.current = true
      setReloadTrigger(false)
    }
  }, [reloadTrigger])

  const reloadProducts = () => {
    console.log('reloadProducts')
    setReloadTrigger(true) // Set reloadTrigger to true to trigger useEffect
  }

  return { products, loading, error, reloadProducts }
}
