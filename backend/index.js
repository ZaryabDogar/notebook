const connecttomongo = require('./db')
const express = require('express')
var cors = require('cors')

connecttomongo()

const app = express()
const port = 500
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://notebook-tan-three.vercel.app'); // Replace with your frontend URL
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
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