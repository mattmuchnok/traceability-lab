const express = require('express')
const path = require('path')

const app = express()

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(express.static(path.join(__dirname, '../')))

const port = process.env.PORT || 4005

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})