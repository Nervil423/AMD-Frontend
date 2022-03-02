const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();
const port = 3001

app.set('views', 'views')
app.set('view engine', 'pug')


app.get('/', (request, response) => {
    fs.readFile('./public/index.html', 'utf8', (err, html) => {
        if (err) {
            response.status(500)
        }
        response.send(html);
    })
});

app.listen(port || port+1, () => {
    console.log(`App available on port ${port}`)
})