const listen = require('test-listen');
const t = require('tap');
const { promisify } = require('util');
const { createServer } = require('http');
const fetch = require('node-fetch');
const { send, serve } = require('micro');
const { randomUUID } = require('crypto');
const { correlator, getId } = require('../lib');

const sleep = promisify(setTimeout);

const service = (req, res) => {
  t.equal(getId(), req.correlationId());
  send(res, 200, req.correlationId());
};

const get = (uri, id, header = 'x-correlation-id') => {
  const headers = id ? { [header]: id } : {};
  return fetch(uri, { headers }).then((r) => r.text());
};

const startServer = async (svc, header) => {
  const server = createServer(serve(correlator(header)(svc)));
  const uri = await listen(server);
  return { uri, server };
};

t.test('set id from incoming request', async (t) => {
  const { server, uri } = await startServer(service);
  const id = randomUUID();

  const body = await get(uri, id);

  t.equal(
    body,
    id,
    'req.correlationId() should return id from header of inbound request'
  );

  server.close();
});

t.test('custom header key', async (t) => {
  const header = 'x-test-header';
  const { server, uri } = await startServer(service, header);
  const id = randomUUID();

  const body = await get(uri, id, header);

  t.equal(
    body,
    id,
    'req.correlationId() should return id from custom header of inbound request'
  );

  server.close();
});

t.test('with await', async (t) => {
  const id = randomUUID();
  const svc = async (req, res) => {
    await sleep(10);
    send(res, 200, req.correlationId());
  };
  const { server, uri } = await startServer(svc);

  const body = await get(uri, id);

  t.equal(body, id, 'should keep context after await call');

  server.close();
});

t.test('multiple requests', async (t) => {
  const { server, uri } = await startServer(service);
  const id1 = 'test-id-1';
  const id2 = 'test-id-2';
  const id3 = 'test-id-3';

  const [body1, body2, body3] = await Promise.all([
    get(uri, id1),
    get(uri, id2),
    get(uri, id3)
  ]);

  t.equal(body1, id1);
  t.equal(body2, id2);
  t.equal(body3, id3);

  server.close();
});

t.test('creates correlation id when none passed in header', async () => {
  const { server, uri } = await startServer(service);
  const body = await get(uri);

  t.ok(
    body,
    'a correlation id should be created even if none is passed in the request'
  );

  server.close();
});
