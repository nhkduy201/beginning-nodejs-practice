function adminAuth(req, res, next) {
    function send401() {
        res.writeHead(401, {'WWW-Authenticate': 'Basic'});
        res.end();
    }

    const authHeader = req.headers.authorization;
    if(!authHeader) {
        send401();
        return;
    }
    const auth = (new Buffer.from(authHeader.split(' ')[1], 'base64')).toString().split(':');
    [username, pwd] = auth;
    if(username === 'admin' && pwd === 'admin') {
        next();
    } else {
        send401();
    }
}

connect()
.use('/admin', adminAuth)
.use('/admin', function(req, res) {
    res.end('Welcome ADMIN!');
})
.use(function(req, res) {
    res.end('Welcome USER!')
})
.listen(3000);