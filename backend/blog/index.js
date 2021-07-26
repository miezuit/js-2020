const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const jwt = require("jsonwebtoken")
const { response } = require('express')
const app = express()
const port = 8080

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'blog'
})

function createUser(req, resp) {
    let email = req.body.email
    let password = req.body.password

    console.log(`Creating user with email ${email}`)

    // TODO: check that there is no other user with this email
    // in this case, we send a response code of 409 (Conflict)

    const query = 'INSERT INTO user VALUES(NULL, ?, SHA1(?))'

    connection.query(
        query,
        [email, password],
    )
    resp.sendStatus(200) // OK
}

function login(req, resp) {
    const email = req.query.email
    const password = req.query.password

    console.log(`Logging user ${email}`)

    const query = 'SELECT * FROM user WHERE email = ? AND password = SHA1(?)'

    connection.query(
        query,
        [email, password],
        (err, result) => {
            const token = 'dnoid3ireh12h'
            if (result.length == 1) {
                resp.status(200)
                    .send(token)
            } else {
                // TODO: block access from IP/email if too many failed attempts
                console.log(`WARNING: failed attempt to login ${email}`)
                resp.sendStatus(400)
            } 
        }
    )
}

app.use(cors())
app.use(express.json())

app.post('/user', createUser)
app.get('/login', login)

app.listen(
    port,
    () => { console.log(`Listening on http://localhost:${port}`) }
)