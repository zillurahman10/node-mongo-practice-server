const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello whats up guys')
})

// productManagement
// tLW9XGXdqJ5u2EDe



const uri = "mongodb+srv://productManagement:tLW9XGXdqJ5u2EDe@cluster0.dobn4.mongodb.net/porductManagement?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const productsCollections = client.db("porductManagement").collection("products")

        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productsCollections.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })

        app.post('/products', async (req, res) => {
            const pd = req.body;
            console.log('adding new pd', pd);
            const result = await productsCollections.insertOne(pd)
            res.send(result)
        })

        app.delete('products', async (req, res) => {
            const query = {}
            const result = await productsCollections.deleteOne(query)
            res.send(result)
        })

    }
    finally {

    }
}

run().catch(console.dir)


app.listen(port, () => {
    console.log(`Port is running ${port}`);
})