import express from 'express';
import mongoose from 'mongoose';
import './config/logging';
import { mongo, server } from './config/config';
import http from 'http';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    // server connection
    // application.get('/', (req: Request, res: Response) => {
    //     res.send('TTK Authenticator! 🚀');
    // });

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');

    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`🚀 Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
        logging.log('----------------------------------------');
    });

    // database connection
    try {
        const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
        logging.log('----------------------------------------');
        logging.log('🚀 Connected to mongo version ' + connection.version);
        logging.log('----------------------------------------');
    } catch (error) {
        logging.log('----------------------------------------');
        logging.log('Unable to connect to database');
        logging.error(error);
        logging.log('----------------------------------------');
    }
}


Main();



