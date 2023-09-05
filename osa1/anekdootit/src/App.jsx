import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Votes = ({ votes }) => {
  if (votes === 1) {
    return (
      <p>has {votes} vote</p>
    )
  }

  return (
      <p>has {votes} votes</p>
    )
}

const Anecdote = ({ text }) => <p>{text}</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandomAnecdote = () => {
    const random = Math.floor(Math.random()*anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotesIdx = votes.indexOf(Math.max(...votes))

  return (
    <>
      <Header text={'Anecdote of the day'}/>
      <Anecdote text={anecdotes[selected]} />
      <Votes votes={votes[selected]}/>
      <Button handleClick={handleVote} text={'vote'} />
      <Button handleClick={handleRandomAnecdote} text={'next anecdote'} />
      <Header text={'Anecdote with most votes'} />
      <Anecdote text={anecdotes[mostVotesIdx]} />
      <Votes votes={votes[mostVotesIdx]} />
    </>
  )
}

export default App