const express = require('express')
const app = express()
const port = 8080
const idChars = 'abcdefghijklmopqrstwvxyz0123456789'
const idLength = 8

storage = []

function createShortUri(req, resp) {
    const longUri = req.body.longUri
    const id = generateId()
    storage[id] = longUri
    resp.send({
        shortUri: `http://localhost:${port}/short/${id}`
    })
}

function redirectToLongUri(req, resp) {

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
app.use(express.json())

// definim rutele
app.post('/short', createShortUri)
app.get('/short/:id', redirectToLongUri)

app.listen(
    port,
    () => { console.log(`Listening on http://localhost:${port}`) }
)


