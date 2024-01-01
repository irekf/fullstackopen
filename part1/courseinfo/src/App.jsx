const Header = (prop) => {
    return (
        <div>
            <h1>{prop.course}</h1>
        </div>
    )
}

const Part = (prop) => {
    return (
        <p>
            {prop.part.name} {prop.part.exercises}
        </p>
    )
}

const Content = (prop) => {
    const result = []
    prop.content.forEach((part) => {
        result.push(
            <Part key={part.name} part={part} />
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

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    const exerciseTotal = course.parts.map((part) => {
        return part.exercises
    }).reduce((prev, next) => {
        return prev + next
    })

    return (
        <div>
            <Header course={course.name}/>
            <Content content={course.parts}/>
            <Total exerciseTotal={exerciseTotal}/>
        </div>
    )
}

export default App
