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
    // TODO: also add a lifetime for the token (eg: 30 min)
    return jwt.sign(data, secret, { expiresIn: 30 * 60 })
}

function renewToken(token) {
    // TODO:
    // verify token
    // if token is valid create a new token with extended lifetime
    // return the new token
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

function getAllPosts(req, resp) {
    const query = 'SELECT * FROM post'

    connection.query(
        query,
        [],
        (err, result) => {
            resp.status(200)
                .json(result)
                .send()
        }
    )
}

app.use(cors())
app.use(express.json())
app.use(bearerToken())

app.post('/user', createUser)
app.get('/login', login)
app.post('/posts', createPost)
app.get('/posts', getAllPosts)

app.listen(
    port,
    () => { console.log(`Listening on http://localhost:${port}`) }
)