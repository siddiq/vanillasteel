import React from 'react'
import { useProducts } from '../hooks/useProducts'

interface Product {
  product_number: string
  material: string
  form: string
  choice: string
  grade: string
  finish?: string
  surface?: string
  quantity: number
  weight: number
  length?: number
  width?: number
  height?: number
  thickness?: number
  outer_diameter?: number
  wall_thickness?: number
  web_thickness?: number
  flange_thickness?: number
  certificates?: string
  location: string
}

// Define the type for error to include the message property
interface ErrorType {
  message: string
}

export const Dashboard: React.FC = () => {
  const { products, loading, error, reloadProducts } = useProducts() as {
    products: Product[]
    loading: boolean
    error: ErrorType | null // Assuming error can be null or have a message
    reloadProducts: () => void
  }

  if (loading) {
    return <md-circular-progress indeterminate></md-circular-progress>
  }

  if (error) {
    return (
      <md-filled-text-field
        disabled
        value={`Error: ${error.message}`}
      ></md-filled-text-field>
    )
  }

  const totalVolumeInTons = products.reduce(
    (volume: number, c: Product) => volume + c.weight,
    0
  )

  const handleRefresh = () => {
    reloadProducts()
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <h2>Products</h2>
      <p>total products {products.length}</p>
      <p>total volume (t) {totalVolumeInTons}</p>
      <button onClick={handleRefresh}>Refresh</button>
      <md-list>
        {products.slice(0, 5).map((product: Product) => (
          <md-list-item key={product.product_number}>
            {JSON.stringify(product)}
            <div slot="headline">{product.form}</div>
          </md-list-item>
        ))}
      </md-list>
      end
    </div>
  )
}
