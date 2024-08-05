const connecttomongo = require('./db')
const express = require('express')
var cors = require('cors')

connecttomongo()

const app = express()
const port = 500
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World! ')
})

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Your NoteBook listening on port http://localhost:${port}`)
})