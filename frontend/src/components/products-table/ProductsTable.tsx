import React, { useState } from 'react'
import { Product, PRODUCT_SORT_DIR, PRODUCT_SORT_KEY } from '../../types'
import { TablePaginator } from './Paginator'
import { TableComponent } from './Table'
import { PRODUCT_PAGE_SIZE } from '../../constants'
import { sortAndPaginate } from '../../util/sorting'
import './ProductsTable.css'

interface ProductsTableProps {
  products: Product[]
}

export const ProductsTable = ({ products }: ProductsTableProps) => {
  const [key, setKey] = useState<PRODUCT_SORT_KEY>(PRODUCT_SORT_KEY.WEIGHT)
  const [dir, setDir] = useState<PRODUCT_SORT_DIR>(PRODUCT_SORT_DIR.DESC)
  const [pageNumber, setPageNumber] = useState(0)

  const totalVolumeInTons = products.reduce(
    (volume: number, product: Product) => volume + product.weight,
    0
  )

  const totalPages = Math.ceil(products.length / PRODUCT_PAGE_SIZE)
  const sortedAndPaged = sortAndPaginate(
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

  const totalItems = products.length.toLocaleString('en-US')
  const totalVolumeInTonsFormatted = totalVolumeInTons.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (
    <div className="products-table">
      <p>Total number of Line Items = {totalItems}</p>
      <p>Total volume (t) = {totalVolumeInTonsFormatted}</p>
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
    </div>
  )
}
