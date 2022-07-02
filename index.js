const express = require('express')
const figlet = require('figlet')
const app = express()

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.set("view engine", "ejs")

app.get("/info", (request, response) => {
    response.render("info.ejs", {count: data.length, date: new Date().toString()})
})
app.get("/api/persons", (request, response)=> {
    response.json(data)
})
app.get("/api/persons/:id", (request, response) => {
    const person = data.find(e=>e.id==request.params.id)
    if (person) response.json(person)
    else figlet(`404!! - User ID ${request.params.id} not found`, (err, data)=>{
      if (err) {
        console.log("error with figlet")
        console.dir(err)
      } else {
        response.status(404).send("<pre>" + data +"</pre>")
      }
    })
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})