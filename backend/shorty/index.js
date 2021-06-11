const express = require('express')
const app = express()
const port = 8080

storage = []

function createShortUri(req, resp) {

}

function redirectToLongUri(req, resp) {
    const longUri = req.body.longUri
    const id = generateId()
    storage[id] = longUri
    resp.send({
        shortUri: `http://localhost:${port}/short/${id}`
    })
}

function generateId() {
    return Math.floor(Math.random() * 100000) + 10000
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


