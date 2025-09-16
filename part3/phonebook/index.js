const express = require("express")
const {response} = require("express");
const app = express()
app.use(express.json())

const contacts = [
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

const PORT = 3001
app.listen(PORT)
console.log(`Server listening on port ${PORT}`)