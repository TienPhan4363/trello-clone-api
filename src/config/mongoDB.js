import { MongoClient } from 'mongodb';
import { env } from './environment.js';

let dbInstance = null;

export const connectDB = async () => {
    //create a client
    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    //connect the client to server
    await client.connect();

    //assign clientDB to dbInstance
    dbInstance = client.db(env.DATABASE_NAME);

};

//get database instance
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to Database first!');
    return dbInstance;
};

