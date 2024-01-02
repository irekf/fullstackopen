import { useState } from 'react'

const Button = ({text, onClick}) => {
    return (<button onClick={onClick}>{text}</button>)
}

const Stat = ({name, value}) => {
    return (<p>{name} {value}</p>)
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button text={'good'} onClick={() => setGood(good + 1)}/>
            <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)}/>
            <Button text={'bad'} onClick={() => setBad(bad + 1)}/>
            <h1>statistics</h1>
            <Stat name={'good'} value={good}/>
            <Stat name={'neutral'} value={neutral}/>
            <Stat name={'bad'} value={bad}/>
        </div>
    )
}

export default App
