import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AcnedotesForm from './components/AcnedotesForm'
import AcnedotesList from './components/AcnedotesList'
import AcnedotesFilter from './components/AcnedotesFilter'
import Notification from './components/Notification'
import { initializeAcnedotes } from './reducers/acnedotesReducer'

const App = ( ) => {

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(initializeAcnedotes())
  
  },[])

  return (
    <div>
      <div> <Notification /> </div>
      <h1>Acnedotes</h1>
      <div> < AcnedotesForm /> </div>
      <div> < AcnedotesFilter /> </div>
      <h2>Acnedotes List</h2>
      <div> < AcnedotesList /> </div>
    </div>
  )
}

export default App