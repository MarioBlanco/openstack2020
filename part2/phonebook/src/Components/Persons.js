import React from 'react'

const Person = ({person,handleClick})=>{
    return(
        <li>
            <form>
                {person.name} - {person.number} <button value={person.name} onClick={handleClick} >Delete</button>
            </form>
        </li>
    )

}
const Persons = ({persons,handleClickDelete})=>{

    return(
        <div>
            <h2>Numbers</h2>
            <ul>
                {persons.map(
                    person=>
                        <Person key={person.name} person={person} handleClick={handleClickDelete}/>
                )}
            </ul>
        </div>
    )
}

export default Persons