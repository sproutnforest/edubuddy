const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;
const { ObjectId } = require('mongodb');
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.use('/static', express.static('public'));
app.use(express.json()); // To parse JSON request bodies

app.post('/addData', async (req, res) => {
    try {
      await client.connect(); 
      const database = client.db('edubuddy_data');
      const materialCollection = database.collection('subject_material');
  
      const newData = req.body;
      console.log("Received new piece:", newData);
      const result = await materialCollection.insertOne(newData);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send('Error inserting data into MongoDB');
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});