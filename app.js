const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv/config')

// CONNECT TO DB
// Requires a .env file which contains the database connection string in a form like
// DB_CONNECTION=connection123
const client = new MongoClient(process.env.DB_CONNECTION, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

async function run() {
    try {
        await client.connect()
        await client.db('admin').command({ ping: 1 })
        console.log('Ping was successful. You are connected to MongoDB')
    } finally {
        await client.close()
    }
}

run().catch(console.dir)

// MIDDLEWARES
app.use('/posts', () => {
    console.log('This is a middleware running')
})

// ROUTES
app.get('/', (req, res) => {
    res.send('This it the root route')
})

app.get('/posts', (req, res) => {
    res.send('This is a sub route')
})

// SERVER LISTENING
app.listen(3000)
