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

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

app.use('/static', express.static('public'));
app.use(express.json()); 

app.get('/mapel', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('edubuddy_data');
    const collection = database.collection('subjects'); 
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Error fetching subjects');
  }
});

app.get('/viewData', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('edubuddy_data');
    const collection = database.collection('subject_material'); 
  
    const data = await collection.find().toArray();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Error fetching subjects');
  }
});

app.get('/getDataById/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const database = client.db('edubuddy_data');
    const collection = database.collection('subject_material');
    const data = await collection.findOne({ _id: new ObjectId(id) });
    res.json(data);
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});

app.post('/addData', async (req, res) => {
    try {
      await client.connect(); 
      const database = client.db('edubuddy_data');
      const materialCollection = database.collection('subject_material');
  
      const newData = req.body;
      console.log("Received new piece:", newData);
      const result = await materialCollection.insertMany(newData);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send('Error inserting data into MongoDB');
    }
})

app.delete('/deleteData/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await client.connect();
    const database = client.db('edubuddy_data');
    const collection = database.collection('subject_material');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).send('Deleted successfully');
    } else {
      res.status(404).send('No document found');
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).send('Error deleting document');
  }
});

app.put('/updateData/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    await client.connect();
    const database = client.db('edubuddy_data');
    const collection = database.collection('subject_material');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    res.send('Updated successfully');
  } catch (err) {
    res.status(500).send('Error updating data');
  }
});


app.post('/register', async (req, res) => {
  try {
    await client.connect(); 
    const database = client.db('edubuddy_data');
    const materialCollection = database.collection('teachers');

    const newData = req.body;
    console.log("Received new piece:", newData);
    const result = await materialCollection.insertOne(newData);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send('Error inserting data into MongoDB');
  }
})

app.post('/login', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('edubuddy_data');
    const teachers = database.collection('teachers');

    const { email, password } = req.body;

    const user = await teachers.findOne({ Email: email });

    if (!user || user.Password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      Username: user.Username,
      AsalSekolah: user.AsalSekolah
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send('Error during login');
  }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});