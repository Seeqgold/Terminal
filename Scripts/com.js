const SerialPort = require('serialport').SerialPort;
const Readline = require('@serialport/parser-readline');

// Replace 'COM3' with your actual COM port
const port = new SerialPort({
  path: 'COM7', // Specify the path for the COM port
  baudRate: 115200 // Adjust the baud rate as needed
});

// The parser will read the data line by line
//const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Open the port
port.on('open', () => {
  console.log('Serial port opened.');
  
  const request = `
<request>
<command>initSerialPort</command>
<serialPort>COM7</serialPort>
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

// Read data from the COM port
/*parser.on('data', (data) => {
  console.log('Received data from COM port:', data);
});*/

// Handle any errors
port.on('error', (err) => {
  console.log('Error:', err.message);
});
