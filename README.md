# micro-correlation-id

> Correlate http requests across microservices built with [micro](https://github.com/zeit/micro).

[![npm version](https://badge.fury.io/js/micro-correlation-id.svg)](https://badge.fury.io/js/micro-correlation-id)

This a [micro](https://github.com/zeit/micro) module for setting a [correlation id](https://blog.rapid7.com/2016/12/23/the-value-of-correlation-ids/) per HTTP request. The correlation id associated with a request remains consistent across async calls made within the scope of the request handler.

This module is inspired by [express-correlation-id](https://github.com/toboid/express-correlation-id) and makes use of [AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage).

## Installation

```bash
# npm
npm i -S micro-correlation-id

# or yarn
yarn add micro-correlation-id
```

## Usage

```javascript
const { correlator, getId } = require('micro-correlation-id');
const assert = require('assert');

module.exports = correlator()(async (req, res) => {
  // These values will always be the same within this scope
  assert.equal(req.correlationId(), getId());
  res.end();
});
```

## API

### `correlator(idHeader='x-correlation-id')`

This creates and/or sets the correlation id on each incomming request. If the incoming request has a correlation id then that id is preserved, a new uuid is assigned otherwise. The correlation id may be accessed using `req.correlationId()` or `getId()`.

`correlator` takes and optional argument `idHeader` which defaults to `x-correlation-id`. This is HTTP header key used for passing a correlation id. You may change this to your liking.

### `getId()`

Use this to get the current correlation id from any where within a request handler. It will always be equivalent to `req.correlationId()`.

## License

[MIT](LICENCE)
