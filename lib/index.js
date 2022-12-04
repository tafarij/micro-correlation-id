const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');

const storage = new AsyncLocalStorage();
const getId = () => storage.getStore();

const correlator =
  (header = 'x-correlation-id') =>
  (handler) =>
  (req, res, ...restArgs) => {
    req.correlationId = getId;

    return storage.run(req.headers[header] || randomUUID(), () => {
      return handler(req, res, ...restArgs);
    });
  };

module.exports = {
  correlator,
  getId
};
