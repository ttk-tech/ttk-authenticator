import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';
export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
export const MONGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true, w: 'majority' };
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const SECRET_KEY = process.env.SECRET_KEY || '';


export const mongo = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_URL,
  MONGO_OPTIONS,
  MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}`
}

export const server = {
  TEST,
  DEVELOPMENT,
  SERVER_HOSTNAME,
  SERVER_PORT,
  SECRET_KEY
}