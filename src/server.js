import express from 'express';
import { connectDB } from './config/mongoDB.js';
import { env } from './config/environment.js';

connectDB()
    .then( () => console.log('Connected success to database server'))
    .then( () => bootServer())
    .catch( error => {
        console.error(error);
        process.exit(1);
    });

const bootServer = () => {
    const app = express();
    app.get('/', async (req, res) => {
        res.end('<h1>Hello worldfddddddddddddd!</h1>');
    });

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        // eslint-disable-next-line no-console
        console.log(`Hello, Im running at ${env.APP_HOST}:${env.APP_PORT}/`);
    });
};
