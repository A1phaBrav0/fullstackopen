const Persons = ({persons, deletePerson}) => {
    return persons.map(person =>
        <div key={person.id}>
            {person.name} {person.number}
            <button
                key={person.id}
                onClick={() => deletePerson(person.id)}>
                Delete
            </button>
        </div>
    )
}

export default Persons