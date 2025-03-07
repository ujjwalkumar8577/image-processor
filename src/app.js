require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB } = require('./utils/database');

const app = express();
app.use(express.json());

const processedDir = path.join(__dirname, '../processed');
app.use('/processed', express.static(processedDir));

app.get('/health', (req, res) => {
  res.send('OK');
});

const processingRequestsRouter = require('./routes/processingRequests.route');
app.use('/requests', processingRequestsRouter);

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
