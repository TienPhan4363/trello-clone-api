import express from 'express';
import cors from 'cors';
import { connectDB } from './config/mongoDB.js';
import { env } from './config/environment.js';
import { apiV1 } from './routes/v1';
import { corsOptions } from './config/cors';

connectDB()
    .then( () => console.log('Connected success to database server'))
    .then( () => bootServer())
    .catch( error => {
        console.error(error);
        process.exit(1);
    });

const bootServer = () => {
    const app = express();

    app.use(cors(corsOptions));

    //enable req.body data
    app.use(express.json());

    //use apiV1
    app.use('/v1', apiV1);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        // eslint-disable-next-line no-console
        console.log(`Hello, Im running at ${env.APP_HOST}:${env.APP_PORT}/`);
    });
};
