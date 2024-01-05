const Header = ({course}) => {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({content}) => {
    const result = []
    content.forEach((part) => {
        result.push(
            <Part key={part.id} part={part} />
        )
    })
    return result
}

const Total = (prop) => {
    return (
        <p><b>total of {prop.exerciseTotal} exercises</b></p>
    )
}

const Course = ({course}) => {
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


const App = () => {

    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
        ]
    }

    return <Course course={course} />
}

export default App
