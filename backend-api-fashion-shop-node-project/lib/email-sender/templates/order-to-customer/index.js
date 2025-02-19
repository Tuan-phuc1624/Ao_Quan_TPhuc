const customerInvoiceEmailBody = (option) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .invoice-container {
            max-width: 800px;
            margin: 20px auto;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 20px;
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            max-width: 150px;
        }

        .user-info {
            margin-bottom: 20px;
        }

        .user-info h2 {
            font-size: 18px;
            margin-bottom: 10px;
            border-bottom: 2px solid #eee;
            padding-bottom: 5px;
        }

        .user-info p {
            margin: 5px 0;
        }

        .order-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .order-table th, .order-table td {
            text-align: left;
            padding: 10px;
            border: 1px solid #ddd;
        }

        .order-table th {
            background-color: #f4f4f4;
        }

        .order-summary {
            text-align: right;
            margin-top: 10px;
        }

        .order-summary p {
            margin: 5px 0;
        }

        .total {
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <!-- Logo Section -->
        <div class="logo">
            <img src="https://res.cloudinary.com/dfxrqzsay/image/upload/v1732298518/category/24fslogo.png" alt="Company Logo">
        </div>

        <!-- User Information -->
        <div class="user-info">
            <h2>User Information</h2>
            <p><strong>Name:</strong> ${option.customer.name}</p>
            <p><strong>Contact:</strong> ${option.customer.contact}</p>
            <p><strong>Address:</strong> ${option.customer.address}</p>
            <p><strong>Email:</strong> ${option.customer.email}</p>
        </div>

        <!-- Order Table -->
        <table class="order-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                ${option.products.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${option.currency}${product.price.toFixed(2)}</td>
                    <td>${option.currency}${(product.quantity * product.price).toFixed(2)}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <!-- Order Summary -->
        <div class="order-summary">
            <p class="total"><strong>Total:</strong> ${option.currency}${option.total.toFixed(2)}</p>
        </div>
    </div>
</body>
</html>
`;
};

module.exports = { customerInvoiceEmailBody };
