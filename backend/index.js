const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3000;
const imageRoutes = require('./routes/imageRoutes');

// Parse JSON request body
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Use image routes
app.use('/api', imageRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
