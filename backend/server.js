const express = require('express');
const cors = require('cors');  // Enable CORS for frontend access

// Import route handlers
const inventoryReportRoutes = require('./routes/inventoryReport');
const freshnessReportRoutes = require('./routes/freshnessReport');
const salesReportRoutes = require('./routes/salesReport');

const app = express();
const port = 5000;  // Backend will run on port 5000

// Middleware for parsing JSON data in request bodies
app.use(express.json());

// Enable CORS for all routes, allowing frontend on localhost:3000 to make requests
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests only from frontend on port 3000
  methods: ['GET', 'POST'],  // Allow only these methods (can be adjusted)
  credentials: true  // Enable sending cookies if necessary
}));

// Use the imported routes
app.use('/api', inventoryReportRoutes);  // All inventory-related routes will now start with /api
app.use('/api', freshnessReportRoutes);  // All freshness-related routes will start with /api
app.use('/api', salesReportRoutes);  // All sales-related routes will start with /api

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
