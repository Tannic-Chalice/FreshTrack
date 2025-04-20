const express = require('express');
const router = express.Router();

// Sample mock data for the freshness report
const freshnessData = [
  {
    item: "Apple",
    freshness_status: "Fresh"
  },
  {
    item: "Banana",
    freshness_status: "Rotten"
  }
  // More data as needed
];

// Route to fetch the freshness report
router.get('/freshness-report', (req, res) => {
  res.json(freshnessData);  // Send the freshness data as a response
});

module.exports = router;
