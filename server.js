const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');


    let path = './views/';
    switch(req.url) {
        case '/': 
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        default: 
            path += '404.html';
            break;
    }


    //send an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            //end the response
            res.end();
        } else {
            //write content we want to send back to the browser
            res.write(data);
            res.end();
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});