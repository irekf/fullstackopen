import { useState } from 'react'

const Button = ({text, onClick}) => {
    return (<button onClick={onClick}>{text}</button>)
}

const StatisticRow = ({name, value, unit = ''}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value} {unit}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad, total, average, positivePct}) => {
    if (total > 0) {
        return (
            <table>
                <StatisticRow name={'good'} value={good}/>
                <StatisticRow name={'neutral'} value={neutral}/>
                <StatisticRow name={'bad'} value={bad}/>
                <StatisticRow name={'all'} value={total}/>
                <StatisticRow name={'average'} value={average}/>
                <StatisticRow name={'positive'} value={positivePct} unit={'%'}/>
            </table>
        )
    } else {
        return (<p>No feedback given</p>)
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [average, setAverage] = useState(0.0)
    const [positivePct, setPositivePct] = useState(0.0)

    const updateDerivedStats = (good, bad, total) => {
        setTotal(total)
        setAverage((good - bad) / total)
        setPositivePct(good / total * 100)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={'good'} onClick={() => {
                const newGood = good + 1
                setGood(newGood)
                updateDerivedStats(newGood, bad, total + 1)
            }}/>
            <Button text={'neutral'} onClick={() => {
                setNeutral(neutral + 1)
                updateDerivedStats(good, bad, total + 1)
            }}/>
            <Button text={'bad'} onClick={() => {
                const newBad = bad + 1
                setBad(newBad)
                updateDerivedStats(good, newBad, total + 1)
            }}/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average}
                        positivePct={positivePct}/>
        </div>
    )
}

export default App
