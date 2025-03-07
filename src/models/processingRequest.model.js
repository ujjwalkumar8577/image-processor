const mongoose = require('mongoose');
const { REQUEST_STATUS } = require('../constants/constants');

const processingRequestSchema = new mongoose.Schema({
  requestId: { type: String, unique: true, required: true },
  status: { type: String, enum: Object.values(REQUEST_STATUS), default: REQUEST_STATUS.PENDING },
  products: [{
    name: String,
    images: [{
      inputUrl: String,
      outputUrl: String,
    }],
  }]
}, { timestamps: true });

module.exports = mongoose.model('ProcessingRequest', processingRequestSchema);
