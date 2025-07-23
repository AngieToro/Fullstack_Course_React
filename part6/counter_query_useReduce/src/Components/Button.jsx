import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {

    //Llama al reducer y actualiza el estado
    const dispatch = useCounterDispatch()
  
    return (
        <button onClick={() => dispatch({ type })}>
        {label}
        </button>
    )
}

export default Button