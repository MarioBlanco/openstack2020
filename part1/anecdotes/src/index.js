import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



const ButtonAnecdote = ({setSelected})=>{

    const handleClick=(setSelected)=>{
        const handler=()=>{
            setSelected(Math.random()*anecdotes.length<<0)
        }
        return handler
    }
    return(
        <div>
            <button onClick={handleClick(setSelected)}>next anecdote</button>
        </div>
    )
}
const DisplayVotes = ({votes,selected})=>{
    return(
        <div>
            has {votes[selected]} votes
        </div>
    )
}



const ButtonVoteAnecdote = ({selected,votes,setVotes,max,setMax})=>{

    const handleClick=(selected,votes,setVotes,max,setMax)=>{
        const stateCopy={...votes}
        stateCopy[selected]+=1
        const maxCopy={...max}
        if(stateCopy[selected]>maxCopy[1]){
            maxCopy[0]=selected
            maxCopy[1]=stateCopy[selected]
        }

        const handler=()=>{
            setVotes(stateCopy)
            setMax(maxCopy)
        }
        return handler
    }
    return(
        <div>
            <button onClick={handleClick(selected,votes,setVotes,max,setMax)}>vote</button>
        </div>
    )
}



const Anecdotes = ({anecdotes,selected})=>{

    return (
        <div>
            {anecdotes[selected]}
        </div>
    )
}

const DisplayAnecdoteDay = ({anecdotes,votes,max})=>{


    return(

        <div>
            <h1>Anecdote with most votes</h1>
            <Anecdotes anecdotes={anecdotes} selected={max[0]}/>
            <DisplayVotes selected={max[0]} votes={votes}/>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes,setVotes] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
    const [max,setMax] = useState(new Array(3).join('0').split('').map(parseFloat))
    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                <Anecdotes anecdotes={props.anecdotes} selected={selected}/>
                <DisplayVotes votes={votes} selected={selected}/>
                <ButtonVoteAnecdote selected={selected} setVotes={setVotes} votes={votes} max={max} setMax={setMax}/>
                <ButtonAnecdote setSelected={setSelected} />
            </div>
            <div>
                <DisplayAnecdoteDay votes={votes} anecdotes={props.anecdotes} max={max}/>
            </div>
        </div>

    )
}


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)