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
        {Sumber: "Admin", SumberSekolah: "SDN Tarumanagara", Kategori: "Wajib", Pelajaran: "PJOK", Kelas: "1", SumberBuku: "PJOK untuk Anak Luar Biasa", Pertanyaan: ["Apakah pertanyaannya masuk?", "Apakah pertanyaan ke 2 masuk juga?"], Jawaban: "Ya, masuk", Konteks: "Ya, masuk. Pertanyaannya sudah masuk ke database"},
    ];

    const collection2 = db.collection('teachers');

    const initialData2 = [
        {Username: "Admin", Email: "Admin@email.com", AsalSekolah: "SDN Tarumanagara", Password: "12345"}
    ]

    const collection3 = db.collection('subjects');

    const initialData3 = [
        {Subject: "PJOK"}, {Subject: "PKN"}, {Subject: "Bahasa Indonesia"}, {Subject: "Seni Budaya"}
    ]

    try {
        const result = await collection.insertMany(initialData);
        const result2 = await collection2.insertMany(initialData2);
        const result3 = await collection3.insertMany(initialData3);
        console.log(`${result.insertedCount} documents inserted into 'subject_material' collection.`);
        console.log(`${result2.insertedCount} documents inserted into 'teachers' collection.`);
        console.log(`${result3.insertedCount} documents inserted into 'subjects' collection.`);
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await closeConnection();
    }
}

initializeDatabase().catch(console.error);
