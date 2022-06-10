const connect = require('connect');
const port = 3000;
// a simple logging middleware

function parseJSON(req, res, next) {
    if (req.headers['content-type'] == 'application/json') {
        // Load all the data
        var readData = '';
        req.on('readable', function () {
            readData += req.read();
        });
        // Try to parse
        req.on('end', function () {
            try {
                req.body = JSON.parse(readData);
            }
            catch (e) { }
            next();
        });
    }
    else {
        next();
    }
}

function about(req, res) {
    switch (req.method) {
        case 'GET':
            res.end('About page!');
            break
        default:
            break
    }
}

function page404(req, res) {
    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/':
                    res.end('Home page!')
                    break
                default:
                    res.end('404!')
            }
            break
        default:
            break
    }
}

const app = connect()

app.use('/parseJSON', parseJSON)

app.use('/about', about)

app.use(page404)

app.listen(port, console.log(`server running on port ${port}`))
