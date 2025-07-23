import { filterChange } from '../reducers/acnedotesFilter'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {

    const dispatch = useDispatch()

    const handleFilter = (event) => {

        event.preventDefault()

        const filter = event.target.value
        console.log('Filter: ', filter)
        
        dispatch(filterChange(filter))
    }

    return (

        <div>
            Search <input onChange={ handleFilter }></input>
        </div>
    )
} 

export default AnecdoteFilter