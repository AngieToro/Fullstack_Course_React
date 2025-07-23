import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const NotesFilter = () => {

  const dispatch = useDispatch()

  return (

    <div>
      All
      <input
        type="radio"
        name="filter"
        onChange={ () => dispatch(filterChange('ALL'))}
      />
      Important
      <input
        type="radio"
        name="filter"
        onChange={ () => dispatch(filterChange('IMPORTANT'))}
      />
      No Important
      <input
        type="radio"
        name="filter"
        onChange={ () => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  )
}

export default NotesFilter