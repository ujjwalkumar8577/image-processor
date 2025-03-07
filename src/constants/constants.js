const STATUS_CODES = {
  SUCCESS: 200,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  VALIDATION_FAILED: 422,
};

const SUCCESS_MESSAGES = {
  CREATE_REQUEST: 'Request created successfully',
  GET_REQUEST_STATUS: 'Request status fetched successfully',
  TRIGGER_WEBHOOK: 'Webhook triggered successfully',
};

const ERROR_MESSAGES = {
  REQUEST_NOT_FOUND: 'Request not found',
  REQUEST_PROCESSING_NOT_COMPLETED: 'Request processing not completed yet',
};

const REQUEST_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
};

const QUALITY_FACTOR = 50;

module.exports = {
  REQUEST_STATUS,
  QUALITY_FACTOR,
  STATUS_CODES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
};
