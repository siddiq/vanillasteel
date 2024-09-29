import React, { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import './Dashboard.css'
import { Product, PRODUCT_SORT_DIR, PRODUCT_SORT_KEY } from '../types'
import { TableComponent } from '../components/ProductsTable'

// Define the type for error to include the message property
interface ErrorType {
  message: string
}

const sortAndPage = (
  products: Product[],
  sortKey: PRODUCT_SORT_KEY,
  sortDirection: PRODUCT_SORT_DIR,
  offset: number,
  limit: number
) => {
  const sortedArray = [...products]

  if (sortKey === PRODUCT_SORT_KEY.WEIGHT) {
    if (sortDirection === PRODUCT_SORT_DIR.ASC) {
      sortedArray.sort((a, b) => a.weight - b.weight)
    } else {
      sortedArray.sort((a, b) => b.weight - a.weight)
    }
  } else if (sortKey === PRODUCT_SORT_KEY.FORM_AND_CHOICE) {
    if (sortDirection === PRODUCT_SORT_DIR.ASC) {
      sortedArray.sort((a, b) => {
        const formAndChoiceA = `${a.form} ${a.choice}`
        const formAndChoiceB = `${b.form} ${b.choice}`
        return formAndChoiceA.localeCompare(formAndChoiceB)
      })
    } else {
      sortedArray.sort((a, b) => {
        const formAndChoiceA = `${a.form} ${a.choice}`
        const formAndChoiceB = `${b.form} ${b.choice}`
        return formAndChoiceB.localeCompare(formAndChoiceA)
      })
    }
  }

  const sortedAndPagedArray = sortedArray.slice(offset, offset + limit)

  return sortedAndPagedArray
}

export const Dashboard: React.FC = () => {
  const [key, setKey] = useState<PRODUCT_SORT_KEY>(PRODUCT_SORT_KEY.WEIGHT)
  const [dir, setDir] = useState<PRODUCT_SORT_DIR>(PRODUCT_SORT_DIR.DESC)

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
    (volume: number, product: Product) => volume + product.weight,
    0
  )

  const handleRefresh = () => {
    reloadProducts()
  }

  const sortedAndPaged = sortAndPage(products, key, dir, 0, 10)
  const handleResort = (key: PRODUCT_SORT_KEY, dir: PRODUCT_SORT_DIR) => {
    setKey(key)
    setDir(dir)
  }

  return (
    <div className="dashboard">
      <h1>Dashboard Page</h1>
      <h2>Products</h2>
      <p>total products {products.length}</p>
      <p>total volume (t) {totalVolumeInTons}</p>
      <TableComponent
        products={sortedAndPaged}
        sortedBy={key}
        sortedByDir={dir}
        resort={handleResort}
      />
      <md-filled-button onClick={handleRefresh}>Reload</md-filled-button>
    </div>
  )
}
