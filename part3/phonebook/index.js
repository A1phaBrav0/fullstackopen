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
    const person = contacts.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else response.send(404).end()

})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(p => p.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(404).json({
            error: "content missing"
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server listening on port ${PORT}`)