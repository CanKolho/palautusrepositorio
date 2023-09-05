import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ values }) => {
  const [good, neutral, bad] = values
  const sum = good + neutral + bad
  const avg = sum ? (good - bad)/sum : 0
  const positives = sum ? (good/sum)*100 : 0
  
  if (sum > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good}/>
          <StatisticLine text={'neutral'} value={neutral}/>
          <StatisticLine text={'bad'} value={bad}/>
          <StatisticLine text={'all'} value={sum}/>
          <StatisticLine text={'average'} value={avg}/>
          <StatisticLine text={'positive'} value={positives + ' %'}/>
        </tbody>
      </table>
    )
  }

  return (
    <div>
      No feedback given
    </div>
  )  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text={'give feedback'}/>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <Header text={'statistic'}/>
      <Statistics values={[good, neutral, bad]}/>
    </>
  )
}

export default App