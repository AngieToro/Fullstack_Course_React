import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import NoteAddForm from '../components/NoteAddForm'

describe('NoteAdd component', () => {

  test('<NoteForm /> updates parent state and calls onSubmit', async () => {

    const createNote = vi.fn()

    render(<NoteAddForm createNote={createNote} />)

    const input = screen.getByPlaceholderText('Write note content here')
    console.log('Input: ', input)

    const sendButton = screen.getByText('Save')

    await userEvent.type(input, 'testing a form...')
    await userEvent.click(sendButton)

    console.log('Mock calls: ', createNote.mock.calls)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
  })

  test('does not render this', () => {
    const note = {
      content: 'This is a reminder',
      important: true
    }

    render(<NoteAddForm note={note} />)

    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
  })

})