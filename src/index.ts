import express, { Request, Response, Express } from 'express';

import * as mongoDB from "mongodb";


const app: Express = express();
const port = process.env.PORT || 3000;

// database configuration
import dotenv from 'dotenv';
dotenv.config();

// console.log();
const dbURL = process.env.DB_URL
const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbURL as string);
client.connect();
console.log("Connected");


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! 🚀');
});

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});