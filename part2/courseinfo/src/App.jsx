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
            <Part key={part.id} part={part}/>
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
    const exerciseTotal = Object.values(course.parts).reduce((prev, {exercises}) => prev + exercises, 0)
    return (
        <div>
            <Header course={course.name}/>
            <Content content={course.parts}/>
            <Total exerciseTotal={exerciseTotal}/>
        </div>
    )
}

const App = () => {

    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    const courseComponents = []
    courses.forEach((course) => courseComponents.push(<Course key={course.id} course={course}/>))

    return (
        <div>
            {courseComponents}
        </div>
    )
}

export default App
