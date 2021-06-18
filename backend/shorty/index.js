const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const idChars = 'abcdefghijklmopqrstwvxyz0123456789'
const idLength = 8

storage = []

function createShortUri(req, resp) {
    const longUri = req.body.longUri
    console.log(req.body)
    const id = generateId()
    storage[id] = longUri
    resp.send({
        shortUri: `http://localhost:${port}/short/${id}`
    })
}

function redirectToLongUri(req, resp) {
    const id = req.params.id
    console.log(id)
    longUri = storage[id]
    console.log(longUri)
    console.log(storage)
    if (longUri === undefined) {
        resp.status(404).send()
        return
    }
    resp.redirect(301, longUri)
        .send()
}

function generateId() {
    let id = ''
    for(let i=0; i<idLength; i++) {
        let randomPosition = Math.floor(Math.random() * idChars.length)
        id = id + idChars[randomPosition]
    }
    return id
}

// inregistram middleware care sa parseze json
// inregistram middleware pentru cors
app.use(cors())
app.use(express.json())


// definim rutele
app.post('/short', createShortUri)
app.get('/short/:id', redirectToLongUri)

app.listen(
    port,
    () => { console.log(`Listening on http://localhost:${port}`) }
)


