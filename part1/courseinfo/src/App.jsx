const Header = (prop) => {
    return (
        <div>
            <h1>{prop.course}</h1>
        </div>
    )
}

const Content = (prop) => {
    const result = []
    prop.content.forEach((part) => {
        result.push(
            <p key={part.partName}>
                {part.partName} {part.exerciseNum}
            </p>
        )
    })
    return result
}

const Total = (prop) => {
    return (
        <p>Number of exercises {prop.exerciseTotal}</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const content = [
        {partName: 'Fundamentals of React', exerciseNum: 10},
        {partName: 'Using props to pass data', exerciseNum: 7},
        {partName: 'State of a component', exerciseNum: 14},
    ]
    const exerciseTotal = content.map((part) => {
        return part.exerciseNum
    }).reduce((prev, next) => {
        return prev + next
    })

    return (
        <div>
            <Header course={course}/>
            <Content content={content}/>
            <Total exerciseTotal={exerciseTotal}/>
        </div>
    )
}

export default App
