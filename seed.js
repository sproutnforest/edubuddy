// const { connectToDatabase, closeConnection } = require('./app');

const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function connectToDatabase(dbName) {
    try {
        await client.connect(); 
        console.log(`Connected to MongoDB, Database: ${dbName}`);
        return client.db(dbName);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

async function closeConnection() {
    await client.close();
    console.log("Connection to MongoDB closed.");
}


async function initializeDatabase() {
    const dbName = 'edubuddy_data'; 
    const db = await connectToDatabase(dbName); 

    const collection = db.collection('subject_material');

    const initialData = [
        {Sumber: "Admin", Pertanyaan: ["Apakah pertanyaannya masuk?", "Apakah pertanyaan ke 2 masuk juga?"], Jawaban: "Ya, masuk", Konteks: "Ya, masuk. Pertanyaannya sudah masuk ke database"},
    ];

    try {
        const result = await collection.insertMany(initialData);
        console.log(`${result.insertedCount} documents inserted into 'piece' collection.`);
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await closeConnection();
    }
}

initializeDatabase().catch(console.error);
