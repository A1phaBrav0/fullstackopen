const mongoose = require("mongoose")

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

if (process.argv.length < 3) {
    console.log("Please enter password as an argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.i6ltfob.mongodb.net/phonebook?retryWrites=true&w=majority&appName=cluster0`
mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length > 3) {
    let person = new Person({
        name: process.argv[3],
        phoneNumber: process.argv[4]
    })
    person.save().then(() => {
        console.log(`added ${person.name} number ${person.phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {

        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
