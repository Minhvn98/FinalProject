const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()
const port = process.env.PORT
console.log(process.env)
app.get('/', (req, res) => {
    res.send('Setup project')
})

app.listen(port, () => {
    console.log(`App listen on ${port}`)
})