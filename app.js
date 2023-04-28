const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv/config')

app.use(bodyParser.json())

// IMPORT ROUTES
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)

// CONNECT TO DB
// Requires a .env file which contains the database connection string in a form like
// DB_CONNECTION=connection123

async function connectToMongoDB() {
    await mongoose.connect(process.env.DB_CONNECTION)
    switch (mongoose.connection.readyState) {
        case 0:
            console.log('Disconnected')
            break
        case 1:
            console.log('Connected')
            break
        case 2:
            console.log('Connecting')
            break
        case 3:
            console.log('Disconnecting')
            break
    }
}

connectToMongoDB().catch(console.dir)

// SERVER LISTENING
app.listen(3000)
