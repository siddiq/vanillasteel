import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('Renders links to dashboard and search page', () => {
  render(<App />)

  expect(screen.getByText(/Dashboard/)).toBeInTheDocument()
  expect(screen.getByText(/Search/)).toBeInTheDocument()
  expect(screen.getByText(/About/)).toBeInTheDocument()
})
