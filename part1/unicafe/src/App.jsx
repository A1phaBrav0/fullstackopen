import {useState} from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    let total = good + neutral + bad

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button text={'good'} onClick={() => setGood(good + 1)}/>
            <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)}/>
            <Button text={'bad'} onClick={() => setBad(bad + 1)}/>
            <h1>Statistics</h1>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {total}</div>
            <div>average {total > 0 ? (good - bad) / total : 0}</div>
            <div>positive {good > 0 ? ((good / total) * 100).toFixed(13) : 0} %</div>
        </div>
    )
}

export default App
