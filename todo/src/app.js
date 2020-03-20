const express = require('express')
const {
    getTask,
    getAllTask,
    createTask,
    updateTask,
    deleteTask
} = require('./controller')

const app = express()
app.locals.dataFilePath = './data.json'
const port = 3000

app.use(express.json())
app.get('/', (req, res) => res.send('<h1>TODO List</h1>'))

//api

app.get("/api/task/:id", getTask)
app.get('/api/task/', getAllTask)
app.post('/api/task/', createTask)
app.put('/api/task/:id', updateTask)
app.delete('/api/task/:id', deleteTask)

app.listen(port, () => console.log(`TODO list app listening on port ${port}!`))

exports.app = app