const {
    app
} = require('../src/app.js')
const {
    asyncReadFile,
    asyncWriteFile
} = require('../src/rwfile')

const request = require('supertest')

describe("app", () => {
    describe("get request", () => {
        it("should get all task when request url pattern is '/api/task'", (done) => {
            app.locals.dataFilePath = "./test/testdata.json"
            request(app).get('/api/task/').expect(200).expect([{
                "id": 1,
                "content": "web homework",
                "createTime": "2020-03-20T00:00:00Z"
            },
            {
                "id": 2,
                "content": "English homework",
                "createTime": "2020-03-20T00:00:00Z"
            }]).end((err, res) => {
                if (err) throw err;
                done()
            })
        })
        it("should get specific tast when request url pattern is '/api/task/:id'", (done) => {
            request(app).get('/api/task/1').expect(200).expect({
                "id": 1,
                "content": "web homework",
                "createTime": "2020-03-20T00:00:00Z"
            }).end((err, res) => {
                if (err) throw err;
                done()
            })
        })
    })
    
    describe("post request", () => {
        afterEach(async function() {
            await asyncWriteFile(JSON.stringify([{
                "id": 1,
                "content": "web homework",
                "createTime": "2020-03-20T00:00:00Z"
            },
            {
                "id": 2,
                "content": "English homework",
                "createTime": "2020-03-20T00:00:00Z"
            }]))
        })
        it("should create a api when the corresponding task does not exist in the datasource", (done) => {
            request(app).post('/api/task/').send({
                "id":3,
                "content": "Math homework",
                "createTime": "2020-03-20T00:00:00Z"
            }).expect(201).expect([{
                "id": 1,
                "content": "web homework",
                "createTime": "2020-03-20T00:00:00Z"
            },
            {
                "id": 2,
                "content": "English homework",
                "createTime": "2020-03-20T00:00:00Z"
            },
            {
                "id":3,
                "content": "Math homework",
                "createTime": "2020-03-20T00:00:00Z"
            }]).end((err, res) => {
                if (err) throw err;
                done()
            })
        })

    })
    describe("delete request", () => {
        it("should delete a specific task when the corresponding task exist in the datasource", (done) =>{
            request(app).delete('/api/task/3').expect(204).end((err,res) => {
                if (err) throw err
                done()
            })
        })
    })
})