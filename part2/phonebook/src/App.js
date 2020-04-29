import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addPerson = (event)=>{
    event.preventDefault()
    const personObj={
      name: newName,
    }
    setPersons(persons.concat(personObj))
    setNewName('')
  }

  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }

  const Number = ({person})=>{
      return(
          <li>
              {person.name}
          </li>
      )

  }

  const ShowNumbers = ({persons})=>{
      return(
          <div>
              <h2>Numbers</h2>
              <ul>
                  {persons.map(
                      person=>
                          <Number key={person.name} person={person}/>
                  )}
              </ul>
          </div>
      )
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <form>
          <div>
            name: <input
                  value={newName}
                  onChange={handleNameChange}
                  />
          </div>
          <div>
            <button type="submit" onClick={addPerson}>add</button>
          </div>
        </form>
        <ShowNumbers persons={persons} />
        
      </div>
  )
}

export default App