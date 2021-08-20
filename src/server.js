import express from 'express';
// eslint-disable-next-line no-unused-vars
import { mapOrder } from '*/utilities/sorts.js';

const app = express();
const hostname = 'localhost';
const port = 4363;

app.get('/', (req, res) => {
    res.end('<h1>Hello worldfddddddddddddd!</h1>');
});

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello, Im running at ${hostname}:${port}/`);
});
