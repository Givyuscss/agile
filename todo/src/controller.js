const fs = require('fs')

const {
    asyncReadFile,
    asyncWriteFile
} = require('./rwfile')


exports.getTask = async (req, res) => {
    const id = req.params.id
    const file = await asyncReadFile(req.app.locals.dataFilePath)
    const api = JSON.parse(file).filter(v => v.id === Number(id))
    api.length == 0 ? res.status(404).send() : res.send(api[0])
}

exports.getAllTask = (req, res) => fs.readFile(req.app.locals.dataFilePath, "utf-8", (err, data) => {
    if (err){
        return res.status(500),send()
    } else{
        res.send(JSON.parse(data))
    }
})

exports.createTask = async (req,res) => {
    const newapi = req.body
    const file = await asyncReadFile(req.app.locals.dataFilePath)
    const api = JSON.parse(file)
    if (api.filter(v => v.id === api.id).length !== 0) {
        res.status(400).send()
    } else{
        api.push(newapi)
        await asyncWriteFile(JSON.stringify(api), req.app.locals.dataFilePath)
        res.status(201).send(api)
    }
}

exports.updateTask = async (req, res) => {
    const newput = req.body
    const file = await asyncReadFile(res.app.locals.dataFilePath)
    const api = JSON.parse(file)
    const candidates = api.filter(v => v.id === newput.id)
    if (candidates.length === 0){
        this.createTask(req,res)
    } else{
        api.forEach((value, index, array) => {
            if (value.id === newput.id){
                array[index] = {
                    ...value,
                    ...newput
                }
            }
        })
        await asyncWriteFile(JSON.stringify(api), req.app.locals.dataFilePath)
        res.status(200).send(api)
    }
}

exports.deleteTask = async (req, res) => {
    const id = req.params.id
    const file = await asyncReadFile(req.app.locals.dataFilePath)
    const api = JSON.parse(file)
    const newapi = api.filter(v => v.id !== Number(id))
    if (api.length === newapi.length){
        res.status(404).send()
    } else{
        await asyncWriteFile(JSON.stringify(newapi), req.app.locals.dataFilePath)
        res.status(204).send()
    }
}

