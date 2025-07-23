import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Togglable'

describe('Togglable component', () => {

  let container

  //se llama antes de cada prueba, la cual luego renderiza el componente Togglable y guarda el campo container del valor devuelto.
  beforeEach(() => {

    try {

      const result = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" >
            togglable content
          </div>
        </Togglable>
      )

      container = result.container

      //console.log('Prueba', container.innerHTML)

    } catch (error) {
      console.log('Render error: ', error)
    }

  })

  test('renders without crashing', () => {
    render(
      <Togglable buttonLabel="show...">
        <div>content</div>
      </Togglable>
    )
    //console.log('Render result:', result.container.innerHTML)
  })

  test('renders its children', async() => {

    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {

    const div = container.querySelector('.togglableContent')
    //console.log('DIV encontrado:', div)
    //console.log('Computed style:', getComputedStyle(div).display)
    //console.log('Inline styles:', div.style.cssText)
    //expect(div).not.toBeNull()
    expect(div).toHaveStyle('display: none')
    //expect(getComputedStyle(div).display).toBe('none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})
