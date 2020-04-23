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

    const Statistic = ({text,value})=>{
        return(
            <>
                {text} {value}
            </>
        )
    }

    const Statistics = ({good,neutral,bad})=>{
        if(good+neutral+bad>0) {
            return (
                <>
                    <p>statistics</p>
                    <table>
                        <tbody>
                        <tr>
                            <td><Statistic text="Good" value={good}/></td>
                        </tr>
                        <tr>
                            <td>
                                <Statistic text="Neutral" value={neutral}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Statistic text="Bad" value={bad}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Statistic text="All" value={good + neutral + bad}/>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Statistic text="Average" value={(good * 1 + bad * -1) / (good + neutral + bad)}/>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Statistic text="positive" value={(good / (good + neutral + bad) * 100)+" %"} />

                            </td>
                        </tr>
                        </tbody>
                    </table>




                </>
            )
        }else{
            return(
                <p>
                    No feedback given
                </p>
            )
        }

    }

    return (
        <div>
            <p>give feedback</p>
            <ButtonFeedback state={good} setState={setGood} type="Good"/>
            <ButtonFeedback state={neutral} setState={setNeutral} type="Neutral"/>
            <ButtonFeedback state={bad} setState={setBad} type="Bad"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
