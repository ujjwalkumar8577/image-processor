const {
  createNewRequestHelper,
  getRequestStatusHelper,
  triggerWebhookHelper,
} = require('../helpers/processingRequests.helper');
const { STATUS_CODES, SUCCESS_MESSAGES } = require('../constants/constants');

async function createNewRequest(req, res) {
  try {
    const filePath = req.file.path;
    const data = await createNewRequestHelper({ filePath });
    return res.status(STATUS_CODES.SUCCESS).json({
      message: SUCCESS_MESSAGES.CREATE_REQUEST,
      data,
    });
  } catch (error) {
    return res.status(error.code || STATUS_CODES.SERVER_ERROR).json({
      message: error.message,
      data: {},
    });
  }
}

async function getRequestStatus(req, res) {
  try {
    const { requestId } = req.params;
    const data = await getRequestStatusHelper({ requestId });
    return res.status(STATUS_CODES.SUCCESS).json({
      message: SUCCESS_MESSAGES.GET_REQUEST_STATUS,
      data,
    });
  } catch (error) {
    return res.status(error.code || STATUS_CODES.SERVER_ERROR).json({
      message: error.message,
      data: {},
    });
  }
}

async function triggerWebhookForRequest(req, res) {
  try {
    const { requestId } = req.params;
    const data = await triggerWebhookHelper({ requestId });
    return res.status(STATUS_CODES.SUCCESS).json({
      message: SUCCESS_MESSAGES.TRIGGER_WEBHOOK,
      data,
    });
  } catch (error) {
    console.log(error)
    return res.status(error.code || STATUS_CODES.SERVER_ERROR).json({
      message: error.message,
      data: {},
    });
  }
}

module.exports = {
  createNewRequest,
  getRequestStatus,
  triggerWebhookForRequest,
};
