import React, { useEffect, useState } from 'react'
import { Product } from '../types'
import './Dashboard.css'
import { fetchProducts } from '../services/api'
import { WrapperProductsTable } from '../components/products-table/ProductsTable'

// Define the type for error to include the message property
// interface ErrorType {
//   message: string
// }

export const Dashboard: React.FC = () => {
  const [products, setProducts] = useState([] as Product[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        setProducts(await fetchProducts())
        setError(null)
      } catch (err) {
        setError(new Error('Failed to fetch products'))
      } finally {
        setLoading(false)
      }
    })()
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

  return (
    <div className="dashboard">
      <h1>Dashboard Page</h1>

      <WrapperProductsTable products={products} />
    </div>
  )
}
