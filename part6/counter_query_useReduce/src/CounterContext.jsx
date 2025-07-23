import { createContext, useReducer, useContext } from "react"

// contexto almacena la gestión global del estado y puede proveer un contexto a sus componentes hijos
const CounterContext = createContext()

//maneja las acciones y define cómo cambia el estado
const counterReducer = ( state, action) => {

  console.log('State: ', state)
  console.log('Action: ', action)  

  switch (action.type){
    case "INC":
      return state + 1
    case "DEC": 
      return state - 1
    case "ZERO": 
      return 0
    default: 
      return state
  }
}

export const useCounterValue = () => {

    //para compartir el estado con el valor del count  con todos los componentes hijos
    const counterAndDispatch = useContext(CounterContext)

    return counterAndDispatch[0]
}

export const useCounterDispatch = () => {

    //para compartir el estado con la funcion dispatch  con todos los componentes hijos
    const counterAndDispatch = useContext(CounterContext)

    return counterAndDispatch[1]
}

export const CounterContextProvider = ( props ) => {

    //inicializa el estado y lo distribuye a todos sus hijos
    //counter: es el valor del estado (inicia en 0).
	//counterDispatch: es una función que permite enviar acciones para cambiar el estado.
    const [ counter, counterDispatch ] = useReducer(counterReducer, 0)

    console.log('Counter: ', counter)

    return (
        //comparte el estado con los componentes hijos
        <CounterContext.Provider 
            value={ [ counter, counterDispatch ]} 
        >
            { props.children }

        </CounterContext.Provider>
    )
}

export default CounterContext