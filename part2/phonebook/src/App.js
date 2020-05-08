import React, {useState,useEffect} from 'react'
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import personsService from "./Services/persons";
import Notification from "./Components/Notification";
import './App.css'
const App = () => {
    const [ persons, setPersons ] = useState([
       /* { name: 'Arto Hellas', number: '040-1234567' },
        { name: 'Ada Lovelace', number: '039-44-5323523' },
        { name: 'Dan Abromov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }*/
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [filteredPersons, setFiltered] =useState(persons)
    const [notificationMessage,setNotificationMessage]=useState([null,'error'])

    const updatePersons= (persons)=>{
        setPersons(persons)
        setFiltered(persons)
    }

    const getPersons=()=>{
        personsService
            .getAll()
            .then(initialPersons=> {
                updatePersons(initialPersons)
            })
    }

    useEffect(()=>{
            getPersons()
        },[])


    const addPerson = (event)=>{

        event.preventDefault()
        const personObj={
            name: newName,
            number: newNumber,
        }
        if(persons.find(p=>p.name===personObj.name)){
            setNewName('')
            setNewNumber('')
            if(window.confirm(`${personObj.name} already exists in the phonebook, replace the old number with the new one?`)){
                personsService.update(personObj.name,personObj)
                    .then(()=>getPersons())
                    .then(()=>{
                        setNotificationMessage(["Phonebook updated","message"])
                        setTimeout(()=>{
                            let newNotify = [null,null]
                            setNotificationMessage(newNotify)
                        },3000)
                    })
                    .catch(error =>{
                        console.log(`update failed ${error}`)
                        setNotificationMessage(["Update failed, person not found on Server","error"])
                        setTimeout(()=>{
                            let newNotify = [null,null]
                            setNotificationMessage(newNotify)
                        },3000)
                    })
            }

        }else {
            personsService
                .create(personObj)
                .then(returnedPerson => {
                    let newPersons = persons.concat(returnedPerson)
                    setPersons(newPersons)
                    setFiltered(newPersons.filter(p => p.name.toUpperCase().includes(newFilter.toUpperCase())))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage([`${returnedPerson.name} added to the Phonebook`,"message"])
                    setTimeout(()=>{
                        let newNotify = [null,null]
                        setNotificationMessage(newNotify)
                    },3000)

                })
                .catch(error => {

                    setNotificationMessage([`The person ${personObj.name} already exists in the phonebook's server`,"error"])
                    setTimeout(()=>{
                        let newNotify = [null,null]
                        setNotificationMessage(newNotify)
                    },3000)
                    setPersons(persons.filter(p => p.name !== personObj.name))
                })
        }

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

    const handleClickDelete = (event)=>{
        event.preventDefault()
        if (window.confirm(`Do you really want to delete ${event.target.value}?`)) {
            //console.log(`handleClickDelete event: ${event.target.value}`)
            personsService
                .toDelete(event.target.value)
                .then(() => {
                    getPersons()
                    setNotificationMessage(["Entry deleted","error"])
                    setTimeout(()=>{
                        let newNotify = [null,null]
                        setNotificationMessage(newNotify)
                    },3000)
                })
                .catch(error =>{
                    console.log(`delete failed ${error}`)
                    setNotificationMessage(["Delete failed","error"])
                    setTimeout(()=>{
                        let newNotify = [null,null]
                        setNotificationMessage(newNotify)
                    },3000)
                })

        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage[0]} type={notificationMessage[1]} />
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

    <Persons persons={filteredPersons} handleClickDelete={handleClickDelete}/>
</div>
)
}

export default App