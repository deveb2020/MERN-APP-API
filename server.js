const express = require('express')
const cors = require('cors')
const mongosse = require('mongoose')

const app = express();
const port = 5000;

// midleware
app.use(cors());
app.use(express.json());

// Public URI because this is only test database otherwise we hide in .env file
const uri = "mongodb+srv://admin:admin@cluster0.vwxkf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" 

// connect database 
mongosse.connect(uri, { useNewUrlParser: true })
const connection = mongosse.connection
connection.once('open', () => { console.log("MongoDB database connected") })

// routes
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// server port
app.listen(port, () => { console.log(`Server is running on port: ${port}`) })