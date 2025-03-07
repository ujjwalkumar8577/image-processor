require('dotenv').config();
const csvParser = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
const ProcessingRequestModel = require('../models/processingRequest.model');
const { STATUS_CODES, REQUEST_STATUS, ERROR_MESSAGES } = require('../constants/constants');

const WEBHOOK_URL = process.env.WEBHOOK_URL;

async function createNewRequestHelper({ filePath }) {
  const salt = Math.floor(1000 + Math.random() * 9000);
  const requestId = `${Date.now()}${salt}`;
  const products = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      products.push({
        name: row['Product Name'],
        images: row['Input Image Urls'].split(',').map(url => url.trim()).map(inputUrl => ({ inputUrl, outputUrl: '' })),
      });
    })
    .on('end', async () => {
        await ProcessingRequestModel.create({ requestId, products });
        fs.unlinkSync(filePath);
    });
  return { requestId };
}

async function getRequestStatusHelper({ requestId }) {
  const requestData = await ProcessingRequestModel.findOne(
    { requestId },
    { requestId: 1, status: 1, products: 1 }
  ).lean();
  if (!requestData) {
    throw { code: STATUS_CODES.NOT_FOUND, message: ERROR_MESSAGES.REQUEST_NOT_FOUND };
  }
  const { status, products = [] } = requestData;
  return { requestId, status, products };
}

async function triggerWebhookHelper({ requestId }) {
  const requestData = await ProcessingRequestModel.findOne(
    { requestId },
    { status: 1, products: 1 },
  ).lean();
  if (!requestData) {
    throw { code: STATUS_CODES.NOT_FOUND, message: ERROR_MESSAGES.REQUEST_NOT_FOUND };
  }
  const { status, products = [] } = requestData
  if (status !== REQUEST_STATUS.COMPLETED) {
    throw { code: STATUS_CODES.VALIDATION_FAILED, message: ERROR_MESSAGES.REQUEST_PROCESSING_NOT_COMPLETED };
  }
  await axios.post(WEBHOOK_URL, { requestId, products });
  return { requestId, products };
}

module.exports = {
  createNewRequestHelper,
  getRequestStatusHelper,
  triggerWebhookHelper,
};
