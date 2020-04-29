import React, {useState} from 'react'
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-1234567' },
        { name: 'Ada Lovelace', number: '039-44-5323523' },
        { name: 'Dan Abromov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [filteredPersons, setFiltered] =useState(persons)
    const addPerson = (event)=>{
        const msg = `${newName} is already added to phonebook`
        event.preventDefault()
        const personObj={
            name: newName,
            number: newNumber,
        }
        if(persons.find(p=>  p.name===newName)){
            alert(msg)
        }else {
            let newPersons = persons.concat(personObj)
            setPersons(newPersons)
            setFiltered(newPersons.filter(p=>p.name.toUpperCase().includes(newFilter.toUpperCase())))

        }
        setNewName('')
        setNewNumber('')

    }

    const handleNameChange = (event)=>{
        setNewName(event.target.value)
    }
    const handleNumberChange = (event)=>{
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event)=>{
        setNewFilter(event.target.value)
        setFiltered(persons.filter(p=>p.name.toUpperCase().includes(event.target.value.toUpperCase())))

    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter
                newFilter={newFilter}
                handleFilterChange={handleFilterChange}
            />

    <h3>Add a new</h3>

    <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
/>

    <h3>Numbers</h3>

    <Persons persons={filteredPersons}/>
</div>
)
}

export default App