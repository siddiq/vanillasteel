import React, { useEffect, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { Product, PRODUCT_SORT_DIR, PRODUCT_SORT_KEY } from '../types'
import { TableComponent } from '../components/ProductsTable'
import { PRODUCT_PAGE_SIZE } from '../constants'
import { TablePaginator } from '../components/Paginator'
import './Dashboard.css'
import { fetchProducts } from '../services/api'

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
  const [pageNumber, setPageNumber] = useState(0)

  // const { products, loading, error, reloadProducts } = useProducts() as {
  //   products: Product[]
  //   loading: boolean
  //   error: ErrorType | null
  //   reloadProducts: () => void
  // }
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

  const totalVolumeInTons = products.reduce(
    (volume: number, product: Product) => volume + product.weight,
    0
  )

  const sortedAndPaged = sortAndPage(
    products,
    key,
    dir,
    pageNumber * PRODUCT_PAGE_SIZE,
    PRODUCT_PAGE_SIZE
  )
  const handleResort = (key: PRODUCT_SORT_KEY, dir: PRODUCT_SORT_DIR) => {
    setKey(key)
    setDir(dir)
  }

  const totalPages = Math.ceil(products.length / PRODUCT_PAGE_SIZE)

  return (
    <div className="dashboard">
      <h1>Dashboard Page</h1>

      <p>Total number of Line Items = {products.length}</p>
      <p>Total volume (t) = {totalVolumeInTons.toFixed(2)}</p>

      <div className="page-number">
        Page {pageNumber + 1} of {totalPages}
      </div>
      <TableComponent
        products={sortedAndPaged}
        sortedBy={key}
        sortedByDir={dir}
        resort={handleResort}
      />

      <TablePaginator
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
      {/* <md-filled-button onClick={reloadProducts}>Refresh Data</md-filled-button> */}
    </div>
  )
}
