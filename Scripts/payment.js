let socket;

document.addEventListener('DOMContentLoaded', () => {
    const payButton = document.querySelector('.pay-button');

    payButton.addEventListener('click', () => {
        // Establish WebSocket connection
        socket = new WebSocket('ws://localhost:1337');

        // Handle connection establishment
        socket.onopen = () => {
            console.log('Connected to WebSocket server');

            // Get selected payment options and total amount
            const tender1 = document.querySelector('input[name="tender1"]:checked')?.value;
            const tender2 = document.querySelector('input[name="tender2"]:checked')?.value;
            const totalAmount = document.getElementById('total-amount').innerText;

            // Validate inputs
            if (!tender1 || !tender2 || !totalAmount || parseFloat(totalAmount) === 0) {
                alert('Please select payment options and ensure the amount is valid.');
                return;
            }

            // Prepare payload
            const payload = {
                paymentMethod: `${tender1}-${tender2}`,
                total: totalAmount,
                port: 'COM7'
            };

            // Send payload to server
            socket.send(JSON.stringify(payload));
        };

        // Listen for server messages
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.success) {
                alert(`Transaction successful! Invoice: ${data.invoice}`);
            } else {
                alert('Transaction failed. Please try again.');
            }
        };

        // Handle errors
        socket.onerror = (error) => {
            console.error('Error:', error);
            alert('An error occurred while processing the transaction.');
        };

        // Handle connection close
        socket.onclose = () => {
            console.log('Connection closed.');
        };
    });
});