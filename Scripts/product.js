let totalAmount = 0;

// Add event listeners for all products
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        const productName = this.querySelector('h4').textContent; // Get product name
        const productPrice = this.querySelector('p').textContent; // Get product price (e.g., N10)
 const price = parseInt(productPrice.substring(1)); // Remove 'N' and convert to integer

        // Check if the product is already in the table
        const existingRow = document.querySelector(`#table-div table tr[data-name="${productName}"]`);

        if (existingRow) {
            // Product already exists in the table, so increase the quantity
            const quantityCell = existingRow.querySelector('.quantity');
            const priceCell = existingRow.querySelector('.price');

            let quantity = parseInt(quantityCell.textContent); // Get the current quantity
            quantity += 1; // Increase quantity by 1

            quantityCell.textContent = quantity; // Update quantity in table
            priceCell.textContent = 'N' + (quantity * price); // Update price based on new quantity
        } else {
            // Product is not in the table, create a new row
            const table = document.querySelector('#table-div table');

            // Create a new row element
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-name', productName); // Add a data attribute to track product name
            newRow.innerHTML = `
                <td>${productName}</td>
                <td class="quantity">1</td> <!-- Default quantity of 1 -->
                <td class="price">N${price}</td>
            `;

            // Append the new row to the table
            table.appendChild(newRow);
        }

        // Update the total amount
        totalAmount += price;

        // Update the displayed total amount
        document.getElementById('total-amount').textContent = totalAmount;

        // Log total amount (for debugging purposes)
        console.log(`Total Amount: N${totalAmount}`);
    });
});
