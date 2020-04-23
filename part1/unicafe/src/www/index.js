import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick=(state,setState)=>{
        const handler=()=>{
            setState(state+1)
        }
        return handler
    }

    const ButtonFeedback = ({state,setState,type})=> {

        return (
            <>
                <button onClick={handleClick(state,setState)} >{type}</button>
            </>
        )
    }

    return (
        <div>
            <p>give feedback</p>
            <ButtonFeedback state={good} setState={setGood} type="Good"/>
            <ButtonFeedback state={neutral} setState={setNeutral} type="Neutral"/>
            <ButtonFeedback state={bad} setState={setBad} type="Bad"/>
            <p>statistics</p>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
