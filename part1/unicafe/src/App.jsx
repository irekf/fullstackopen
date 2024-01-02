import { useState } from 'react'

const Button = ({text, onClick}) => {
    return (<button onClick={onClick}>{text}</button>)
}

const Statistics = ({stats}) => {
    const result = []
    let hasStats = false
    stats.forEach((stat) => {
        hasStats = stat.value !== 0 ? true : hasStats
        result.push(<p key={stat.name}>{stat.name} {stat.value} {stat.unit ? stat.unit : ''}</p>)
    })
    if (hasStats) {
        return result
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
            <Statistics stats={[
                {name: 'good', value: good},
                {name: 'neutral', value: neutral},
                {name: 'bad', value: bad},
                {name: 'all', value: total},
                {name: 'average', value: average},
                {name: 'positive', value: positivePct, unit: '%'},
            ]} />
        </div>
    )
}

export default App
