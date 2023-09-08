const connecttomongo = require('./db')
const express = require('express')

connecttomongo()

const app = express()
const port = 300

app.get('/', (req, res) => {
    res.send('Hello World! dogar di yari te sheer di swari kise kise no naseeb hundi aeee ')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})