const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const SmartButcher = require(__dirname + '/../modules/smart-butcher');

const app = next({ 
    dev: process.env.NODE_ENV !== 'production' 
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((request, response) => {
        const parsedUrl = parse(request.url, true);
        const { pathname } = parsedUrl;

        if (pathname === '/cv') {
            const imagePixes = SmartButcher.test();

            response.writeHead(200, {
                'Content-Type': 'application/json'
            });

            response.end(JSON.stringify({ 
                pixels: imagePixes 
            }));
        } 
        else {
            handle(request, response, parsedUrl)
        }
    })
    .listen(3331, error => {
        if (error) {
            throw error
        }

        console.log('Server running on port 3331.');
    })
})