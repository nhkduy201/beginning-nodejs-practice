const http = require('http')
const fsp = require('fs').promises
const fs = require('fs')
const md5 = require('md5')

function send404(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write('Error 404: Resource not found.')
    res.end()
}

function send500(res) {
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.write('Error 500: Internal server error.')
    res.end()
}

function sendHome(res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.createReadStream('static/index.html').pipe(res)
}

function sendHomeJs(res) {
    res.writeHead(200, {'Content-Type': 'application/javascript'})
    fs.createReadStream('static/main.js').pipe(res)
}

function sendAbout(res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.createReadStream('static/about.html').pipe(res)
}
const db = {
    users: [
        {
            username: 'admin',
            password: '273713c04b1ef604f2f0e9d56af304df'
        }
    ] 
}
function checkLogin(data) {
    const user = db['users'].find(user => user.username == data['username'])
    const hashPwd = md5(data.password)
    return user.password == md5(data.password)
}

async function postLogin(req, res) {
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    const dataStr = Buffer.concat(buffers).toString()
    const data = JSON.parse(dataStr)
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.write(`{"isAuth":${checkLogin(data)}}`)
    res.end()
}

let server = http.createServer(function (req, res) {
    try {
        switch (req.method) {
            case 'GET':
                switch (req.url) {
                    case '/':
                        sendHome(res)
                        break
                    case '/about':
                        sendAbout(res)
                        break
                    case '/main.js':
                        sendHomeJs(res)
                        break
                    default:
                        send404(res)
                }
                break
            case 'POST':
                switch (req.url) {
                    case '/login':
                        postLogin(req, res)
                        break
                    default:
                        send404(res)
                }
                break
            default:
                send404(res)
        }
    } catch (error) {
        send500(res)
    }
})

server.listen(3000)
console.log('Server running at http://localhost:3000')