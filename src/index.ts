import express, { Request, Response, Express } from 'express';

import * as mongoDB from "mongodb";


const app: Express = express();
const port = process.env.PORT || 3000;

// database configuration
import dotenv from 'dotenv';
dotenv.config();
const dbURL = process.env.DB_URL
const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbURL as string);

async function database() {
    try {
        // Connect the client to the server (this will validate the connection string as well)
        await client.connect();
        console.log("Connected successfully to server");

        // Optionally perform some database operations
        // const db = client.db('test');
        // const collection = db.collection('example');
        // const count = await collection.countDocuments();
        // console.log(`There are ${count} documents in the example collection.`);
    } catch (err) {
        console.error("Failed to connect to the database!", err);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
database().catch(console.error);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! 🚀');
});

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});