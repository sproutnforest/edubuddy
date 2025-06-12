const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use('/static', express.static('public'));
app.use(express.json());

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edubuddy_data';
const client = new MongoClient(uri);

let db;

async function main() {
  try {
    await client.connect();
    db = client.db('edubuddy_data');
    console.log('Connected to MongoDB');

    app.listen(port, '0.0.0.0', () => {
      console.log(`API server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

// Example route using the shared db instance
app.get('/mapel', async (req, res) => {
  try {
    const collection = db.collection('subjects');
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Error fetching subjects');
  }
});

app.get('/guru', async (req, res) => {
  try {
    const collection = db.collection('teachers');
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).send('Error fetching teachers');
  }
});

app.get('/viewData', async (req, res) => {
  try {
    const collection = db.collection('subject_material');
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching subject_material:', error);
    res.status(500).send('Error fetching subject_material');
  }
});

app.get('/getDataById/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const collection = db.collection('subject_material');
    const data = await collection.findOne({ _id: new ObjectId(id) });
    res.json(data);
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});

app.post('/addData', async (req, res) => {
  try {
    const materialCollection = db.collection('subject_material');
    const newData = req.body;
    const result = await materialCollection.insertMany(newData);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send('Error inserting data into MongoDB');
  }
});

app.delete('/deleteData/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const collection = db.collection('subject_material');
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
    const collection = db.collection('subject_material');
    await collection.updateOne(
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
    const materialCollection = db.collection('teachers');
    const newData = req.body;
    const result = await materialCollection.insertOne(newData);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send('Error inserting data into MongoDB');
  }
});

app.post('/login', async (req, res) => {
  try {
    const teachers = db.collection('teachers');
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

main();