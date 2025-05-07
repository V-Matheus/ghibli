import Home from '@/app/page'
import { render } from '@testing-library/react'
describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />)
  })
})