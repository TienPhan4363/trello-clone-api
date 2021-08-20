import { MongoClient } from 'mongodb';
import { env } from './environment.js';

export const connectDB = async () => {
    //create a client
    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    try {
        //connect the client to server
        await client.connect();
        console.log('Connected successfully to server');

        //list databases
        await listDatabases(client);

    } finally {
        //ensure that the client will close when finish/error
        await client.close();
        console.log('closed');
    }
};

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases();
    // console.log(databasesList);
    console.log('Your databases:');
    databasesList.databases.forEach( db => console.log(` - ${db.name}`));
};
