Chai Hiff
==========

[![Build Status](https://travis-ci.org/dave-irvine/chai-hiff.svg?branch=master)](https://travis-ci.org/dave-irvine/chai-hiff)

HTML matching assertions for Chai.js.

Installation
------------

```
npm i --save-dev chai-hiff
```

```javascript
var chai = require('chai');
chai.use(require('chai-hiff'));
```

API
---

### `.hiffEqual(expected)`

Expect the `expected` to equal the `actual`.

```javascript
expect('<html></html>').to.hiffEqual('<html></html>');
```
