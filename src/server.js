import express from 'express';
import { connectDB } from './config/mongoDB.js';
import { env } from './config/environment.js';

const app = express();
const hostname = env.HOST_NAME;
const port = env.PORT;

connectDB().catch(console.log);

app.get('/', (req, res) => {
    res.end('<h1>Hello world!</h1>');
});

app.listen(port, hostname, () => {
    console.log(`Hello, Im running at ${hostname}:${port}/`);
});
