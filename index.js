const express = require('express');
const logger = require('morgan');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();


const manganeloHome = require('./routes/english/manganelo/home');
const manganeloSearch = require('./routes/english/manganelo/search');
const manganeloDetail = require('./routes/english/manganelo/detail');
const manganeloChapter = require('./routes/english/manganelo/chapter');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/english/manganelo/home', manganeloHome);
app.use('/english/manganelo/search', manganeloSearch);
app.use('/english/manganelo/detail', manganeloDetail);
app.use('/english/manganelo/chapter', manganeloChapter);

const server = http.createServer(app);

server.listen(PORT, function () {
    console.log('Server up and running on localhost:' + PORT);
});