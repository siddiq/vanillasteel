import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { Search } from './Search'
import { fetchProductsMatchedBtPreference } from '../services/api'
import { usePreference } from '../hooks/usePreference'
import { Product } from '../types'
import { act } from 'react'

jest.mock('../services/api', () => ({
  fetchProductsMatchedBtPreference: jest.fn()
}))

jest.mock('../hooks/usePreference', () => ({
  usePreference: jest.fn()
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

describe('Search Component', () => {
  const mockUsePreference = {
    preferences: [] as any[],
    getPreferences: jest.fn(),
    uploadFile: jest.fn(),
    message: '',
    error: ''
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(usePreference as jest.Mock).mockReturnValue(mockUsePreference)
  })

  test('renders the loading indicator initially', async () => {
    ;(fetchProductsMatchedBtPreference as jest.Mock).mockReturnValue(
      new Promise(() => {})
    )

    render(<Search />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('renders the products table after successful fetch', async () => {
    const mockProducts: Product[] = [
      { product_number: '1', form: 'form 1' },
      { product_number: '2', form: 'form 2' }
    ] as any
    ;(fetchProductsMatchedBtPreference as jest.Mock).mockResolvedValue(
      mockProducts
    )
    mockUsePreference.preferences = [{ material: 'Carbon Steel' }]

    await act(async () => {
      render(<Search />)
    })

    const productsTable = await waitFor(() =>
      screen.findByTestId('products-table')
    )
    expect(productsTable).toBeInTheDocument()

    // Verify that product names are rendered
    expect(screen.getByText('form 1')).toBeInTheDocument()
    expect(screen.getByText('form 2')).toBeInTheDocument()
  })

  test('renders error message when fetch fails', async () => {
    ;(fetchProductsMatchedBtPreference as jest.Mock).mockRejectedValue(
      new Error('API Error')
    )

    await act(async () => {
      render(<Search />)
    })

    const errorMessage = await waitFor(() =>
      screen.findByText(/Network Error: Unable to fetch data/i)
    )
    expect(errorMessage).toBeInTheDocument()
  })

  test('handles file selection and form submission', async () => {
    const mockFile = new File(['preference.csv'], 'test.csv', {
      type: 'text/csv'
    })
    mockUsePreference.uploadFile = jest.fn().mockResolvedValueOnce(undefined)
    ;(fetchProductsMatchedBtPreference as jest.Mock).mockResolvedValue([])

    await act(async () => {
      render(<Search />)
    })

    const fileInput = screen.getByLabelText(/Upload new CSV File:/i)
    fireEvent.change(fileInput, { target: { files: [mockFile] } })

    expect(screen.getByText(/Selected file: test.csv/i)).toBeInTheDocument()

    const form = screen.getByTestId('form')

    fireEvent.submit(form)

    await waitFor(() =>
      expect(mockUsePreference.uploadFile).toHaveBeenCalledWith(mockFile)
    )
  })
})
