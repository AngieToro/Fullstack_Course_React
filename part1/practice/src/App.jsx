import {useState} from 'react'

const Hello = (props) => {

  console.log('Hello - React Component')

  const now = new Date()
  console.log('Date: ', now)

  console.log('Props:', props)

  const {name, age} = props

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    console.log('This year is ', yearNow)
    console.log('The born year is ', yearNow - age)
    return yearNow - age
  }

  return (

    <div>
      <p> 
        Hello World from App, it is {now.toString()} 
      </p>
      <p>
        Hello <strong>{name}</strong>, you are <strong>{age}</strong> years old.
        So you were probably born in <strong>{bornYear()}</strong>
      </p>
    </div>

  )
}

const Course = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }

  console.log('Course is: ', course.name)
  course.parts.forEach(part => {
    console.log('Part Course is', part.name, 'with', part.exercises, 'exercises'
  )})

  return (

    <div>
      <p> 
        The Course is <strong>{course.name}</strong> 
      </p>
      {course.parts.map((part, index) => (
        <p key={index}>
          Part <strong>{part.name}</strong> with {part.exercises} exercises
        </p>
      ))}
    </div>

  )
}

const DisplayCount = (props) => <div>{props.counter}</div>

const ButtonsCount = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const History = (props) => {
  if (props.allClicks.length === 0){
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      Button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {

  console.log('App - React Component')

  const a = 10
  const b = 20
  console.log('Sum: ', a + b)

  const name = 'Angelica'
  const age = 36

  const friends = [
    { name: 'Wilder', age: 32},
    { name: 'Bianca', age: 6},
  ]

  const family = ['Mom', 'Dad'] //numbers or string

  //Llamar a una función que cambia el estado hace que el componente se vuelva a renderizar
  //useState no se debe llamar desde dentro de un loop, una expresión condicional o cualquier lugar que no sea una función que defina a un componente
  const [counter, setCounter] = useState(0)
  const increaseByOne = () => setCounter(counter +1)
  const decreaseByOne = () => setCounter(counter -1)
  const setToZero = () => setCounter(0)
  console.log('Counter...', counter)
  //count se inicializa en 0 ya que es el  valor inicial del state
  //setCounter se asigna la funcion que utilizara para modificar el estado 

  const [clicks, setClicks] = useState({
    left:0,
    right: 0
  })

  const [allClicks, setAllClicks] = useState([])

  //{ ...clicks } crea un nuevo objeto que tiene copias de todas las propiedades del objeto clicks
  const handleLeftClick = () => {
    setClicks({
      ...clicks,
      left: clicks.left + 1
    })
    setAllClicks(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1
    })
    setAllClicks(allClicks.concat('R'))
  }

  const total = clicks.left + clicks.right

  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('Value now: ', newValue)
    setValue(newValue)
  }

  return (
    
    <div>
      <h1>App Component</h1>
      <p>
        {a} plus {b} is {a + b}  
      </p>

      <h1>Hello Component</h1>
      {/* <Hello name='Angie' age={36}/> */}
      <Hello name={name} age={age}/>
      
      <h1>App Component</h1>
      <p>
        Hello, <strong>{friends[0].name }</strong> your age is <strong> {friends[0].age} </strong>
      </p>
      <p>
        Hello, <strong>{friends[1].name }</strong> your age is <strong>{friends[1].age}</strong>
      </p>
      <p>
        {family}
      </p>

      <h1>Course Component</h1>
      <Course/>

      <h1>DisplayCount Component</h1>
      <DisplayCount counter={counter}/>
      <ButtonsCount handleClick={increaseByOne}  text='Plus' />
      <ButtonsCount handleClick={decreaseByOne} text='Minus' />
      <ButtonsCount handleClick={setToZero} text='Zero' />

      <h1>Button Component</h1>
      <p>
        {clicks.left}
        <ButtonsCount handleClick={handleLeftClick} text='Left'/>
        <ButtonsCount handleClick={handleRightClick} text='Right'/>
        {clicks.right}
        <p>Clicks total: {total}</p>
        <History allClicks={allClicks} />
      </p>
      <p>
        {value}
        <ButtonsCount handleClick={()=>setToValue(1)} text='One'/>
        <ButtonsCount handleClick={()=>setToValue(0)} text='Reset'/>
        <ButtonsCount handleClick={()=>setToValue(value+1)} text='Increment' />
      </p>
      <p>--------------------</p>
    </div>
  )
}

export default App