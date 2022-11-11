const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
// Middlewire
app.use(cors());
app.use(express.json())


// Mongobd
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l8spglx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    const serviceCollection = client.db("lensqueen").collection('services');
    const reviewCollection = client.db("lensqueen").collection('reviews');
    app.get('/services',async (req,res)=>{

        const query ={}
        const cursor = serviceCollection.find(query).sort({title: 1})
        const services = await cursor.toArray();
        res.send(services);
    });
    app.get('/reviews',async (req,res)=>{

        const query ={}
        const cursor = reviewCollection.find(query)
        const reviews = await cursor.toArray();
        res.send(reviews);

    });
    app.get('/services/:id', async(req,res)=>{
        const id = req.params.id;
        const query ={_id: ObjectId(id)}
        const service = await serviceCollection.findOne(query);
        res.send(service);
    })

    app.post('/services', async(req, res)=>{
        const newservice = req.body;
        const result = await serviceCollection.insertOne(newservice);
        res.send(result);
    })
    app.post('/reviews', async(req,res)=>{
        const newReview = req.body;
        const result = await reviewCollection.insertOne(newReview);
        res.send(result)
    })

}
finally{

}
}

run().catch(err=>{
    console.log(err)
})

app.get('/', (req, res)=>{
    res.send("hello from mongo server");
})

app.listen(port, ()=>{
    console.log("Listening to port")
})