const express = require('express')

const app = express()

// MIDDLEWARES
app.use('/posts', () => {
    console.log('This is a middleware running')
})

// ROUTES
app.get('/', (req, res) => {
    res.send('We are home!')
})

app.get('/posts', (req, res) => {
    res.send('We are on posts')
})

// Establish listening to the server
app.listen(3000)
