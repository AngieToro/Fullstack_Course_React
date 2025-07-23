import { useCounterValue } from '../CounterContext'

const Display = () => {

  // Obtiene el valor actual del contador
  const counter = useCounterValue()

  return (
    <div>
      <strong> 
        { counter } 
      </strong> 
    </div>
  )
}

export default Display