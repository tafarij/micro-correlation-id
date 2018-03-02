'use strict';

const cls = require('continuation-local-storage');
const uuid = require('uuid');

const ns = cls.createNamespace('d7519f70-1ccf-11e8-accf-0ed5f89f718b');
const key = 'CORRELATOR';

const getId = () => ns.get(key);

const correlator = (header = 'x-correlation-id') => handler => (req, res, ...restArgs) => {
  req.correlationId = getId;

  return ns.runAndReturn(() => {
    const id = req.headers[header] || uuid.v4();
    ns.set(key, id);
    return handler(req, res, ...restArgs);
  });
};

module.exports = {
  correlator,
  getId
};
