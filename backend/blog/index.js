const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const jwt = require("jsonwebtoken")
const bearerToken = require("express-bearer-token")
const { response } = require('express')
const app = express()
const port = 8080
const secret = 'dasopewdsdscn#sda=09da'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'blog'
})

function generateToken(email) {
    const data = {
        email: email
    }
    return jwt.sign(data, secret)
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret)
    } catch(err) {
        return null
    }
}

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
            const token = generateToken(email)
            if (result.length == 1) {
                resp.status(200)
                    .send(token)
            } else {
                // TODO: block access from IP/email if too many failed attempts
                console.log(`WARNING: failed attempt to login ${email}`)
                resp.sendStatus(401)
            } 
        }
    )
}

function createPost(req, resp) {
    if (verifyToken(req.token) === null) {
        resp.sendStatus(401)
        return
    } 

    const title = req.body.title
    const content = req.body.content

    const query = 'INSERT INTO post VALUES(NULL, ?, ?)'

    connection.query(
        query,
        [title, content]
    )

    resp.sendStatus(200)
}

app.use(cors())
app.use(express.json())
app.use(bearerToken())

app.post('/user', createUser)
app.get('/login', login)
app.post('/posts', createPost)

app.listen(
    port,
    () => { console.log(`Listening on http://localhost:${port}`) }
)