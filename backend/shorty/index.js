const express = require('express')
const cors = require('cors')
const redis = require('redis')
const { promisify } = require("util")
const app = express()
const port = 8080
const idChars = 'abcdefghijklmopqrstwvxyz0123456789'
const idLength = 8

const storage = redis.createClient({
    port: 6380,
    host: '127.0.0.1'
})

function createShortUri(req, resp) {
    const longUri = req.body.longUri
    console.log(req.body)
    const id = generateId()
    storage.set(id, longUri)
    resp.send({
        shortUri: `http://localhost:${port}/short/${id}`
    })
}

async function redirectToLongUri(req, resp) {
    const id = req.params.id
    console.log(id)
    const asyncGet = promisify(storage.get).bind(storage)
    longUri = await asyncGet(id)
    console.log(longUri)
    console.log(storage)
    if (longUri === undefined) {
        resp.status(404).send()
        return
    }
    resp.redirect(301, longUri)
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


