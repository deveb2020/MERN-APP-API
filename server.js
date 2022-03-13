const express = require('express')
const cors = require('cors')
const mongosse = require('mongoose')

// makes dotenv file accesible for use
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

// connect database
const uri = process.env.ATLAS_URI
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