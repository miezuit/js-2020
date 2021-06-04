const express = require('express')
const app = express()
const port = 8080

function random(min, max) {
    console.log(`min = ${min}, max = ${max}`)
    return { 
        number: Math.floor(Math.random() * (max - min)) + min
    }
}

// /random?min={x}&max={y}
app.get('/random', (req, resp) => { 
    resp.send(random(parseInt(req.query.min), parseInt(req.query.max))) 
})

app.listen(
    port,
    () => { console.log(`Listening on http://localhost:${port}`) }
)