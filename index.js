const express = require('express')
const monk = require('monk')
//middleware
const cors = require('cors')
//to prevent another domain to manipulate your data - for express but not built into it
const bodyParser = require('body-parser')
const app = express()
//express is building our server - a library or framework to use to make your server
const port = "aqueous-chamber-71008.herokuapp.com"


// Connection URL
const url = 'mongodb://JennySloan:duchess@bradscluster-shard-00-00-0v8rx.mongodb.net:27017,bradscluster-shard-00-01-0v8rx.mongodb.net:27017,bradscluster-shard-00-02-0v8rx.mongodb.net:27017/Blab?ssl=true&replicaSet=BradsCluster-shard-0&authSource=admin&retryWrites=true&w=majority';

const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server')
})
const dogs = db.get('OH')

app.use(cors())
app.use(bodyParser.json())
//runs with express

app.get('/', async function (req, res) {
    const results = await dogs.find()
    res.status(200).send(results)
})
// '/' setting your end point for your server

app.put('/:id', async function (req, res) {
    //setting the end point as the variable of our required parameters of the ID
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