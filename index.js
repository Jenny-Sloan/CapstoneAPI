const express = require('express')
const app = express()
const port = 4000
const monk = require('monk')
const cors = require('cors')
const bodyParser = require('body-parser')

// Connection URL
const url = 'mongodb://JennySloan:duchess@bradscluster-shard-00-00-0v8rx.mongodb.net:27017,bradscluster-shard-00-01-0v8rx.mongodb.net:27017,bradscluster-shard-00-02-0v8rx.mongodb.net:27017/Blab?ssl=true&replicaSet=BradsCluster-shard-0&authSource=admin&retryWrites=true&w=majority';

const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server')
})
const dogs = db.get('OH')

app.use(cors())
app.use(bodyParser.json())

app.get('/', async function (req, res) {
    const results = await dogs.find()
    res.status(200).send(results)
})

app.put('/:id', async function (req, res) {
    console.log(req.body)
    const results = await dogs.findOneAndUpdate(req.params.id, {$set: req.body})
   
    res.status(200).send(results)
})

app.post('/', async function (req, res) {
    const results = await dogs.insert(req.body)
    res.status(200).send(results)
})

app.delete('/:id', async function (req, res) {
    const results = await dogs.findOneAndDelete(req.params.id)
    res.status(200).send(results)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))