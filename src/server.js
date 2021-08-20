import express from 'express';
import { mapOrder } from './utilities/sorts.js';

const app = express();
const hostname = 'localhost';
const port = 4363;

app.get('/', (req, res) => {
    res.end('<h1>Hello world!</h1>');
});

app.listen(port, hostname, () => {
    console.log(`Hello, Im running at ${hostname}:${port}/`);
});
