document.addEventListener('DOMContentLoaded', () => {
    const payButton = document.querySelector('.pay-button');

    payButton.addEventListener('click', () => {
        // Get selected payment options and total amount
        const tender1 = document.querySelector('input[name="tender1"]:checked')?.value;
        const tender2 = document.querySelector('input[name="tender2"]:checked')?.value;
        const totalAmount = document.getElementById('total-amount').innerText;

        // Validate that the necessary inputs are filled
        if (!tender1 || !tender2 || !totalAmount || parseFloat(totalAmount) === 0) {
            alert('Please select payment options and ensure the amount is valid.');
            return;
        }

        // Prepare the payload for the backend
        const payload = {
            paymentMethod: `${tender1}-${tender2}`,
            total: totalAmount
        };

        // Send a POST request to the server for processing
        fetch('http://localhost:3000/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Transaction successful! Invoice: ${data.invoice}`);
            } else {
                alert('Transaction failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while processing the transaction.');
        });
    });
});
