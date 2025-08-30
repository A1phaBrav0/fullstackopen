import {useState} from "react";
import Person from "./components/Person.jsx";
import person from "./components/Person.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchStr, setSearchStr] = useState('')
    const [searchEntries, setSearchEntries] = useState(false)


    const isEmpty = (string) => !string.replace(/\s/g, '').length

    const isValidNumberFormat = (string) => {
        const numberFormat = /^(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/
        return numberFormat.test(string)
    }

    const addPerson = (e) => {
        e.preventDefault()

        if (isEmpty(newName) || isEmpty(newNumber)) {
            return alert("Please enter both a mame and phone number")
        }

        const nameInPhonebook = persons.some(person =>
            person.name.toLowerCase() === newName.toLowerCase()
        )

        if (nameInPhonebook) {
            return alert(`${newName} has already been added to the phonebook`)
        }

        if (!isValidNumberFormat(newNumber)) {
            return alert(`${newNumber} is not a valid phone number`)
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    const contactsToShow = searchEntries
        ? persons.filter(person => person.name.toLowerCase().includes(searchStr.toLowerCase()))
        : persons

    const handleSearchFocus = (e) => {
        setSearchEntries(true)
        setSearchStr(e.target.value)
    }

    return (
        <>
            <h2>Phonebook</h2>
            <div>
                Filter shown with <input value={searchStr} onChange={handleSearchFocus} />
            </div>
            <h2>Add a new contact</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)
                }/>
                </div>
                <div>
                    <button type={"submit"}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {contactsToShow.map(person =>
                <Person key={person.id} person={person}/>
            )}
        </>
    )
}

export default App
