import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogAddForm from '../components/BlogAddForm'

describe('BlogAddForm Component', () => {

  test('<BlogAddForm /> updates parent state and calls onSubmit', async () => {

    const createBlog = vi.fn()

    render(<BlogAddForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('Write a Title here')
    const inputAuthor = screen.getByPlaceholderText('Write a Author here')
    const inputUrl = screen.getByPlaceholderText('Write URL here')

    const sendButton = screen.getByText('Create')

    await userEvent.type(inputTitle, 'testing a form...')
    await userEvent.type(inputAuthor,'user')
    await userEvent.type(inputUrl,'localhost')
    await userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('user')
    expect(createBlog.mock.calls[0][0].url).toBe('localhost')
  })

})