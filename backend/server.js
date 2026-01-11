const express = require("express")
const app = express()
const env = require("dotenv")
const bodyParser = require("body-parser")
const { MongoClient } = require('mongodb');
const { urlencoded } = require("body-parser");
var cors = require('cors')

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passmanDB';
const port = 3000

env.config()
app.use(bodyParser.json())
app.use(cors())
client.connect();

// get passwords
app.get("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();

    res.json(findResult)
})

// set passwords
app.post("/", async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);

    res.send({ success: true, result: findResult })
})
// delete passwords
app.delete("/", async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    console.log(findResult);

    res.send("password deleted!")
})

app.listen(port, () => {
    console.log("app listening on port", port);
})