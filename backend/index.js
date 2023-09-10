const connecttomongo = require('./db')
const express = require('express')

connecttomongo()

const app = express()
const port = 100
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World! ')
})


// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})