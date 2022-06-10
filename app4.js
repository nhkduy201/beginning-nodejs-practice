const express = require('express');
const serveIndex = require('serve-index');
const bodyParser = require('body-parser');
const app = express();

app.use('/static', express.static('public', {extensions: ['jpg']}));

app.use('/static', serveIndex('public', {icons: true}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.clear();
    res.end('Hello Express!');
});

app.use('/json-urlencoded', function(req, res, next) {
    res.end(JSON.stringify(req.body));
});

app.use(function(req, res, next) {
    res.status(404).end('404 Warning!');
});

app.use(function(err, req, res, next) {
    console.log(err.message);
    res.status(500).end('500: Internal Error');
})

app.listen(3000);