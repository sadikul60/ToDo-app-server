const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

//Port
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

// add database
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPassword}@cluster0.8jrtwg1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const toDosCollection = client.db('ToDoApp').collection('toDos');

        // get items 
        app.get('/items', async(req, res) => {
            const query = {};
            const items = await toDosCollection.find(query).toArray();
            res.send(items);
        });

        // post items to database (mongoDB)
        app.post('/add/item', async(req, res) =>{
            const item = req.body;
            const result = await toDosCollection.insertOne(item);
            res.send(result);
        })
    }
    finally{
        
    }
}

run().catch(err => console.log(err.message))

app.get('/', (req, res) => {
    res.send('ToDo app is running');
});

app.listen(port, () => {
    console.log(`Server is run on ${port}`);
});