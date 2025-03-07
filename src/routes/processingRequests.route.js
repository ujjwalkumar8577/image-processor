const express = require('express');
const multer = require('multer');
const {
  createNewRequest,
  getRequestStatus,
  triggerWebhookForRequest,
} = require('../controllers/processingRequests.controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), createNewRequest);
router.get('/:requestId', getRequestStatus);
router.post('/:requestId/notify', triggerWebhookForRequest);

module.exports = router;
