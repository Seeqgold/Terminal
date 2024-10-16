const express = require('express');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const WebSocket = require('ws');

const app = express();
app.use(express.json()); // To parse incoming JSON data

// Set up the WebSocket connection to the server
const ws = new WebSocket('ws://localhost:1337'); // Change to your WebSocket server URL

ws.on('open', () => {
    console.log('Connected to the WebSocket server');
    // Example command to initialize serial port communication
    const request = `
<request>
<command>initSerialPort</command>
<serialPort>COM10</serialPort>
</request>
`;
    ws.send(request);
});

ws.on('message', (data) => {
    console.log('Received message from WebSocket server:', data.toString());
    // Handle WebSocket messages from the POS server here
});

ws.on('close', () => {
    console.log('Disconnected from the WebSocket server');
});

ws.on('error', (err) => {
    console.error('WebSocket error:', err);
});

// Set up SerialPort communication
const port = new SerialPort({
    path: 'COM10', // Replace with the actual COM port
    baudRate: 115200 // Set baud rate as required
});
// Open the port
port.on('open', () => {
    console.log('Serial port opened.');
    
    const request = `
  <request>
  <command>initSerialPort</command>
  <serialPort>COM10</serialPort>
  </request>
  `;
  
    // Send data to the COM port
    port.write(request, (err) => {
      if (err) {
        return console.log('Error on write:', err.message);
      }
      console.log('Message sent to COM port.');
    });
  });
  // Handle any errors
port.on('error', (err) => {
    console.log('Error:', err.message);
  });

  // Send data to the POS machine
function sendToPOS(data) {
    return new Promise((resolve, reject) => {
        port.write(data, err => {
            if (err) {
                reject('Error sending data: ' + err.message);
            } else {
                resolve('Data sent successfully');
            }
        });
    });
}

// API endpoint to receive payment info and process the transaction
app.post('/purchase', async (req, res) => {
    const { total, paymentMethod } = req.body;

    // Prepare the data to send to the POS
    const transactionData = `Total: N${total}, Payment Method: ${paymentMethod}`;

    try {
        // Send the transaction data to the POS
        await sendToPOS(transactionData);

        // Simulate a successful transaction and generate an invoice
        const invoice = `Invoice - Total: N${total}, Payment: ${paymentMethod}`;

        // Send success response with invoice
        res.json({ success: true, invoice });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
