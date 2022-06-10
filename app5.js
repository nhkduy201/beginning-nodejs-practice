const express = require('express');
const compression = require('compression');
const app = express()
.use(compression({threshold: '10'}))
.use('/static', express.static(__dirname + '/public'))
.listen(3000);