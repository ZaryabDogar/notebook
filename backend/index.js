const connecttomongo = require('./db')
const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors());

connecttomongo()


const port = 500


const allowedOrigins = [
    'http://localhost:3000',  // Your local development server
    'https://notebook-tan-three.vercel.app',  // Your deployed frontend server
    'https://notesi.netlify.app' // Add other front-end domains as needed
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  };
  
  app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World! ')
})
app.use(express.json())
// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Your NoteBook listening on port http://localhost:${port}`)
})