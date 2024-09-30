import React from 'react'
import { render, screen } from '@testing-library/react'
import { About } from './About'

test('Renders the Page with a heading', () => {
  render(<About />)

  expect(screen.getByText(/Vanilla Steel/)).toBeInTheDocument()
})
