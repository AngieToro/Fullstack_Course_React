import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogShow from '../components/BlogShow'

describe('BlogShow Component', () => {

  test('renders title and author, but not url or likes by default', () => {

    const blogObject = {
      title: 'Component testing',
      author: 'Author',
      url: 'localhost',
      likes: 1
    }

    const { container } = render(<BlogShow blog={ blogObject } />)

    //screen.debug()

    const element = container.querySelector('.blogTitleAuthor')
    expect(element).toHaveTextContent('Component testing')
    expect(element).toHaveTextContent('Author')

    const elementUrl = screen.queryByText('localhost')
    expect(elementUrl).toBeNull()

    const elementLikes = screen.queryByText('1')
    expect(elementLikes).toBeNull()
  })

  test('shows url and likes when the view button is clicked', async() => {

    const blogObject = {
      title: 'Component testing',
      author: 'Author',
      url: 'localhost',
      likes: 1
    }

    render(<BlogShow blog={ blogObject } />)

    const elementUrl = screen.queryByText('localhost')
    expect(elementUrl).toBeNull()

    const elementLikes = screen.queryByText('1')
    expect(elementLikes).toBeNull()

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    expect(elementUrl).toBeDefined()
    expect(elementLikes).toBeDefined()
  })

  test('clicking the button Like calls event handler twice', async() => {

    const mockHandler = vi.fn()
    const user = userEvent.setup()

    const blogObject = {
      title: 'Component testing',
      author: 'Author',
      url: 'localhost',
      likes: 1,
      user: { username: 'user' }
    }

    render(
      <BlogShow
        blog={ blogObject }
        handleLikeBlogSubmit={ mockHandler }
        user={{ username: 'user' }}
      />)

    const buttonView = screen.getByText('View')
    await user.click(buttonView)

    const buttonLike = screen.getByText('Like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    screen.debug()

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })

})
