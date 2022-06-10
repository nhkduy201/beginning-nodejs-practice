const express = require('express');
const app = express();
app.param('hello', function(req, res, next, value, name) {
    req[name] = value;
    next();
});
app.get('/:hello', function (req, res) {
    res.send(req.hello);
});
app.listen(3000);