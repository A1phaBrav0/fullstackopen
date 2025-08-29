import {useState} from "react";
import Person from "./components/Person.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'John Paul',
            phoneNumber: '040-1234567'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    // \s matches any whitespace character (spaces, tabs, newlines, etc.).
    // g is the global flag, meaning it will replace all whitespace characters, not just the first.
    // !0 == not empty
    const isEmpty = (string) => !string.replace(/\s/g, '').length

    const isValidPhoneNumberFormat = (string) => {
        const numberFormat = /^(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/
        return numberFormat.test(string)
    }

    const addPerson = (e) => {
        e.preventDefault()

        if (isEmpty(newName) || isEmpty(newNumber)) {
            return
        }

        const nameInPhonebook = persons.some(person =>
            person.name.toLowerCase() === newName.toLowerCase()
        )

        if (nameInPhonebook) {
            return alert(`${newName} has already been added to the phonebook`)
        }

        if (!isValidPhoneNumberFormat(newNumber)) {
            return alert(`${newNumber} is not a valid phone number`)
        }

        const newPerson = {
            name: newName,
            phoneNumber: newNumber,
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }


    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
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
