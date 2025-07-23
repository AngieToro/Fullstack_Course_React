import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import NoteComponent from '../components/NoteShowImportant'

describe('Note component', () => {

  test('renders content', () => {

    const noteObject = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    render(<NoteComponent note={ noteObject } />)

    //objeto screen para acceder al componente renderizado.
    // El método getByText de screen para buscar un elemento que tenga el contenido de la nota y asegurarnos de que existe
    const element = screen.getByText('Component testing is done with react-testing-library')

    screen.debug()

    //La existencia de un elemento se verifica utilizando el comando expect
    //toBeDefined, prueba si el argumento element de expect existe
    expect(element).toBeDefined()
  })

  test('clicking the button calls event handler once', async() => {

    const noteObject = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    //controlador de eventos
    const mockHandler = vi.fn()

    render(
      <NoteComponent
        note={ noteObject }
        toggleImportance={ mockHandler }
      />
    )

    //Se inicia una sesión para interactuar con el componente renderizado
    const user = userEvent.setup()
    const button = screen.getByText('Make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

})
