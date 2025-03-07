require('dotenv').config();
const axios = require('axios');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const ProcessingRequestModel = require('../models/processingRequest.model');
const { REQUEST_STATUS, QUALITY_FACTOR } = require('../constants/constants');
const { connectDB } = require('../utils/database');

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const WORKER_INTERVAL = 10000;

connectDB();
console.log(`Worker started with interval ${WORKER_INTERVAL} ms`);
const outputDir = path.join(__dirname, '../../processed');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  try {
    const request = await ProcessingRequestModel.findOneAndUpdate(
      { status: REQUEST_STATUS.PENDING },
      { status: REQUEST_STATUS.IN_PROGRESS },
    );
    if (!request) {
      return;
    }
    const { requestId = '', products = [] } = request;
    console.log('Processing request', requestId);
    for (let product of products) {
      const { images = [] } = product;
      for (let i = 0; i < images.length; i++) {
        const { inputUrl = '' } = images[i];
        try {
          const outputPath = path.join(__dirname, `../../processed/${requestId}-${i}.jpg`);
          const response = await axios({ url: inputUrl, responseType: 'arraybuffer' });
          await sharp(response.data).jpeg({ quality: QUALITY_FACTOR }).toFile(outputPath);
          images[i].outputUrl = `http://localhost:3000/processed/${requestId}-${i}.jpg`;
        } catch (error) {
          console.log(error);
          console.error(`Failed to process ${inputUrl}: ${error.message}`);
        }
      }
    }
    await axios.post(WEBHOOK_URL, { requestId, products });
    request.status = REQUEST_STATUS.COMPLETED;
    await request.save();
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

setInterval(processImages, WORKER_INTERVAL);
