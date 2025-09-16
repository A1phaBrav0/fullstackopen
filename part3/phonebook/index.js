const express = require("express")
const app = express()
app.use(express.json())

let contacts = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    const id = Math.random() * (900000 - 5) + 5
    return String(Math.round(id))
}

const checkName = (name) => {
    const [person] = contacts.filter(contact => contact.name === name)
    return person
}

app.get("/api/persons", (request, response) => {
    response.json(contacts)
})

app.get("/api/info", (request, response) => {
    response.send(
        `
        <div>
            <p>Phonebook has info for ${contacts.length} people</p>
            <p>${new Date().toString()}</p>
        </div>
      `
    )
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = contacts.find(contact => contact.id === id)

    if (person) {
        response.json(person)
    } else response.send(404).end()
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const {name, number} = request.body

    if (!name || !number) {
        return response.status(400).json({
            error: "content missing, must provide both name and number"
        })
    }

    if (checkName(name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const contact = {
        id: generateId(),
        name,
        number,
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server listening on port ${PORT}`)