import {useState} from "react";
import Person from "./components/Person.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'John Paul'}
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }


    const addPerson = (e) => {
        e.preventDefault()

        if (newName.length === 0) {
            return
        }

        const nameInPhonebook = persons.some(person =>
            person.name.toLowerCase() === newName.toLowerCase()
        )

        if (nameInPhonebook) {
            return alert(`${newName} has already been added to the phonebook`)
        }

        const newPerson = {
            name: newName,
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
    }

    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type={"submit"}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person =>
                <Person key={person.name} person={person}/>
            )}
        </>
    )
}

export default App
