import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef( ( props, refs )  => {

  console.log('Props Toggable: ', props)

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible
      ? 'none'
      : ''
  }

  const showWhenVisible = {
    display: visible
      ? ''
      : 'none'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  //definir funciones en un componente que se pueden invocar desde fuera del componente.
  useImperativeHandle(refs, () => {

    return {
      toggleVisibility
    }
  })

  return (

    <div>
      <div style={ hideWhenVisible }>
        <button onClick={ toggleVisibility } >
          { props.buttonLabel }
        </button>
      </div>
      <div className="togglableContent" style={ showWhenVisible }>
        { props.children }
        <button onClick={ toggleVisibility }> Cancel </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable