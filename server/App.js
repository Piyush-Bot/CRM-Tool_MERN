const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('hello world from server');
});
app.get('/about', (req, res) => {
    res.send('hello about world from server');
});
app.get('/contact', (req, res) => {
    res.send('hello contact world from server');
});
app.get('/signin', (req, res) => {
    res.send('hello login world from server');
});
app.get('/signup', (req, res) => {
    res.send('hello registration world from server');
});


app.listen(3000, () => {
console.log('running on server 3000');
});