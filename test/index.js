const micro = require('micro');
const listen = require('test-listen');
const request = require('request-promise');
const test = require('ava');
const sleep = require('then-sleep');
const {correlator, getId} = require('../lib');

const testId = 'test-correlation-id';
const service = req => {
  return req.correlationId();
};

test('set id from incoming request', async t => {
  const server = micro(correlator()(service));
  const uri = await listen(server);

  const body = await request({
    uri,
    headers: {'x-correlation-id': testId}
  });

  t.is(body, testId, 'req.correlationId() should return id from header of inbound request');
});

test('custom header key', async t => {
  const server = micro(correlator('x-test-header')(service));
  const uri = await listen(server);

  const body = await request({
    uri,
    headers: {'x-test-header': testId}
  });

  t.is(body, testId, 'req.correlationId() should return id from custom header of inbound request');
});

test('req.correlationId() and getId()', async t => {
  const svc = req => {
    return {
      correlationId: req.correlationId(),
      getId: getId()
    };
  };
  const server = micro(correlator()(svc));
  const uri = await listen(server);

  const body = await request({
    uri,
    json: true
  });

  t.is(body.correlationId, body.getId, 'req.correlationId() and getId() should return the same id');
});

test('with await', async t => {
  const svc = async req => {
    await sleep(10);
    return req.correlationId();
  };
  const server = micro(correlator()(svc));
  const uri = await listen(server);

  const body = await request({
    uri,
    headers: {'x-correlation-id': testId}
  });

  t.is(body, testId, 'should keep context after await call');
});
