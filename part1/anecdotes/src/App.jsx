import {useState} from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({anecdote}) => <div>{anecdote}</div>

const Votes = ({numberOfVotes}) => <div>{`has ${numberOfVotes} votes`}</div>

const AnecdoteDisplay = ({anecdote, numberOfVotes: numberOfVotes}) => {
    return (
        <>
            <Anecdote anecdote={anecdote}/>
            <Votes numberOfVotes={numberOfVotes}/>
        </>
    )
}

function App() {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const getRandomInt = (int) => Math.floor(Math.random() * int)

    const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const highestVoteIdx = votes.reduce((idxOfHighest, currentItem, indexOfCurrentItem) => {
        return currentItem > votes[idxOfHighest] ? indexOfCurrentItem : idxOfHighest
    }, 0)

    const handleSelected = () => {
        setSelected(getRandomInt(anecdotes.length))
    }

    const handleVote = () => {
        const votesCp = [...votes]
        votesCp[selected] += 1
        setVotes(votesCp)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <AnecdoteDisplay anecdote={anecdotes[selected]} numberOfVotes={votes[selected]}/>
            <Button text={'vote'} onClick={handleVote}/>
            <Button text={'next anecdote'} onClick={handleSelected}/>
            <h1>Anecdote with most votes</h1>
            {
                votes[highestVoteIdx] > 0
                    ? <AnecdoteDisplay anecdote={anecdotes[highestVoteIdx]} numberOfVotes={votes[highestVoteIdx]}/>
                    : <div>No votes have currently been cast!</div>
            }
        </div>
    )
}

export default App
