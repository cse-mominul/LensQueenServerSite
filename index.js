const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
// Middlewire
app.use(cors());
app.use(express.json())


// Mongobd
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l8spglx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res)=>{
    res.send("hello from mongo server");
})

app.listen(port, ()=>{
    console.log("Listening to port")
})