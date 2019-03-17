const { createServer } = require('http');
const SmartButcher = require(__dirname + '/../modules/smart-butcher');

createServer((request, response) => {
    const imagePixes = SmartButcher.test();

    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    response.end(JSON.stringify({ 
        pixels: imagePixes 
    }));
}).listen(3332, error => {
    if (error) {
        throw error
    }

    console.log('Server running on port 3332.');
});