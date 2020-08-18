const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    //write content we want to send back to the browser
    res.write('<p>hello, ninjas!</p>');
    res.write('<p>hello again, ninjas!</p>');

    //end the response
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});