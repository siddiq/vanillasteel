import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { fetchProducts } from '../services/api'
import { Product } from '../types'

jest.mock('../services/api', () => ({
  fetchProducts: jest.fn()
}))

jest.mock('../components/products-table/ProductsTable', () => ({
  ProductsTable: ({ products }: { products: Product[] }) => (
    <div data-testid="products-table">
      {products.map((product) => (
        <div key={product.product_number}>{product.form}</div>
      ))}
    </div>
  )
}))

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the loading indicator initially', async () => {
    ;(fetchProducts as jest.Mock).mockReturnValue(new Promise(() => {}))

    render(<Dashboard />)

    const loadingIndicator = screen.getByRole('progressbar')
    expect(loadingIndicator).toBeInTheDocument()
  })
})
