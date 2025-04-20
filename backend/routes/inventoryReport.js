// routes/inventoryReport.js
const express = require('express');
const router = express.Router();

// Sample endpoint for inventory report
router.get('/inventory-report', (req, res) => {
  const inventoryData = [
    {
      item: 'Apple',
      quantity: 100,
      fresh_items: 80,
      rotten_items: 15,
      disposed_items: 5,
      freshness_status: ['Fresh', 'Fresh', 'Rotten'],
    },
    {
      item: 'Banana',
      quantity: 50,
      fresh_items: 30,
      rotten_items: 15,
      disposed_items: 5,
      freshness_status: ['Fresh', 'Rotten', 'Rotten'],
    },
    {
      item: 'Mango',
      quantity: 150,
      fresh_items: 100,
      rotten_items: 30,
      disposed_items: 20,
      freshness_status: ['Fresh', 'Fresh', 'Fresh'],
    },
  ];

  res.json(inventoryData);  // Send inventory data as JSON
});

module.exports = router;
