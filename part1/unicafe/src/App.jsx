import { useState } from 'react'

const Button = ({text, onClick}) => {
    return (<button onClick={onClick}>{text}</button>)
}

const StatisticLine = ({name, value, unit=''}) => {
    return (<p>{name} {value} {unit}</p>)
}

const Statistics = ({good, neutral, bad, total, average, positivePct}) => {
    if (total > 0) {
        return (
            <>
                <StatisticLine name={'good'} value={good}/>
                <StatisticLine name={'neutral'} value={neutral}/>
                <StatisticLine name={'bad'} value={bad}/>
                <StatisticLine name={'all'} value={total}/>
                <StatisticLine name={'average'} value={average}/>
                <StatisticLine name={'positive'} value={positivePct} unit={'%'}/>
            </>
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

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={'good'} onClick={() => {
                const newGood = good + 1
                setGood(newGood)
                const newTotal = total + 1
                setTotal(newTotal)
                setAverage((newGood - bad) / newTotal)
                setPositivePct(newGood / newTotal * 100)
            }}/>
            <Button text={'neutral'} onClick={() => {
                setNeutral(neutral + 1)
                const newTotal = total + 1
                setTotal(newTotal)
                setAverage((good - bad) / newTotal)
                setPositivePct(good / newTotal * 100)
            }}/>
            <Button text={'bad'} onClick={() => {
                const newBad = bad + 1
                setBad(newBad)
                const newTotal = total + 1
                setTotal(newTotal)
                setAverage((good - newBad) / newTotal)
                setPositivePct(good / newTotal * 100)
            }}/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average}
                        positivePct={positivePct}/>
        </div>
    )
}

export default App
