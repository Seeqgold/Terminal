const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:1337');
//const port = new Port
ws.on('open', function open() {
    console.log('Connected to the WebSocket server');

const request = `
<request>
<command>initSerialPort</command>
<serialPort>COM10</serialPort>
</request>

`;

// Send a message to the server
    ws.send(request);
});

ws.on('message', function incoming(data) {
    console.log('Received message from server:', data.toString());
});

ws.on('close', function close() {
    console.log('Disconnected from the WebSocket server');
});

ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});