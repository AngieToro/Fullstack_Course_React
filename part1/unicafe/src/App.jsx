import { useState } from 'react'

const Buttons = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ color: 'blue'}}>{text}</td> 
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  console.log('Props:', props)

  if (props.total === 0){
    return <p style={{ color: 'red'}}>No Feedback given</p>
  }
  
  return (
      <div>
        <h2>Statistics</h2>
        <StatisticLine text='Good' value={props.good}/>
        <StatisticLine text='Neutral' value={props.neutral}/>
        <StatisticLine text='Bad' value={props.bad}/>
        <p>------------------------</p>
        <StatisticLine text='Total' value={props.total}/>
        <StatisticLine text='Average' value={props.average}/>
        <p>------------------------</p>
        <StatisticLine text='% Good' value={props.goodPercentage}/>
        <StatisticLine text='% Neutal' value={props.neutralPercentage}/>
        <StatisticLine text='% Bad' value={props.badPercentage}/>
      </div>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
    console.log('Good: ', good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    console.log('Neutral: ', neutral)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    console.log('Bad:', bad)
  }

  const total = good + neutral + bad
  console.log('Total: ', total)

  const average = (total / 3).toFixed(2)
  console.log('Average: ', average)

  const goodPercentage = total === 0 ? 0 : ((good / total) * 100).toFixed(2)
  console.log ('Good %: ', goodPercentage)

  const neutralPercentage = total === 0 ? 0 :((neutral / total) * 100).toFixed(2)
  console.log ('Neutral %: ', neutralPercentage)

  const badPercentage = total === 0 ? 0 : ((bad / total) * 100).toFixed(2)
  console.log ('Bad %: ', badPercentage)

  console.log('Total %:', goodPercentage + neutralPercentage + badPercentage)

  return (
      <div>
        <h1>Give Feedback</h1>
        <Buttons handleClick={handleGoodClick} text='Good'/>
        <Buttons handleClick={handleNeutralClick} text='Neutral'/>
        <Buttons handleClick={handleBadClick} text='Bad'/>

        <Statistics 
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          goodPercentage={goodPercentage}
          neutralPercentage={neutralPercentage}
          badPercentage={badPercentage}
        />
      </div>
  )
}

export default App