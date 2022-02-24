const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

// include and initialize the rollbar library with your access token
const rollbar = new Rollbar({
  accessToken: '77a3cb2541ab4cac98a16a5642388fb3',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express()

app.use(express.json())

let students = []

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../index.html'))
//     rollbar.info('html file was served successfully')
// })

app.use(express.static(path.join(__dirname, '../')))

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.critical('student already exists')
        rollbar.critical('OH NO THE STUDENT IS ALREADY IN THE SYSTEM')
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4005

// rolly
app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})