
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

export default Course

