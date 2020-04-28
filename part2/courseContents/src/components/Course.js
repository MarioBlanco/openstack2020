import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce((totalSum,part)=> totalSum+part.exercises,0)
    return(
        <p style={{fontWeight: "bold"}}>total of {sum} exercises</p>
    )
}

const Parts = (props) => {
    return (
        <div>
            {props.parts.map((part)=> {
                    return (
                        <div key={part.id}>
                            {part.name} {part.exercises}
                        </div>
                    )
                }
            )}

        </div>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            <Parts parts={course.parts} />

        </div>
    )
}
const Course = ({courses})=>{
    return(
        <div>
            {courses.map((course)=>{
                return(
                    <div key={course.id}>
                        <Header course={course} />
                        <Content course={course}/>
                        <Total course={course} />
                    </div>
                )
            })}

        </div>
    )
}

export default Course