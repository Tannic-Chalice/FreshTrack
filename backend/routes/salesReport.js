const express = require('express');
const router = express.Router();

// Sample mock data for sales report
const salesData = [
  {
    item: "Apple",
    total_sales: 1500
  },
  {
    item: "Banana",
    total_sales: 800
  }
  // More data as needed
];

// Route to fetch the sales report
router.get('/sales-report', (req, res) => {
  res.json(salesData);  // Send the sales data as a response
});

module.exports = router;
