import {useState} from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    let total = good + neutral + bad;
    let average = total > 0
        && ((good - bad) / total).toFixed(1)

    let positive = good > 0
        && ((good / total) * 100).toFixed(1)


    if (total) {
        return (
            <table>
                <tbody>
                <StatisticLine text={'good'} value={good}/>
                <StatisticLine text={'neutral'} value={neutral}/>
                <StatisticLine text={'bad'} value={bad}/>
                <StatisticLine text={'all'} value={total}/>
                <StatisticLine text={'average'} value={average}/>
                <StatisticLine text={'positive'} value={`${positive} %`}/>
                </tbody>
            </table>
        )
    }
    return (
        <p>No feedback given</p>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button text={'good'} onClick={() => setGood(good + 1)}/>
            <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)}/>
            <Button text={'bad'} onClick={() => setBad(bad + 1)}/>
            <h1>Statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

export default App