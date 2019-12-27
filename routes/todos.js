const express = require('express');
const router = express.Router();
const server = require('../todoServer');

const methods = server();

function sendResult(res, result) {
  if (result[0] < 300) res.send(result[1]);
  else res.status(result[0]).send(result[1]);
}

function delay(method, req) {
	return new Promise(resolve => {
		setTimeout(() => resolve(method(req)), 500);
  });
} 

router.get('/', function(req, res) {
	delay(methods.get, req)
  .then((result) => sendResult(res, result));
});

router.get('/:id', function(req, res) {
	delay(methods.get, req)
  .then((result) => sendResult(res, result));
});

router.post('/', function(req, res) {
	delay(methods.post, req)
  .then((result) => sendResult(res, result));
});

router.put('/:id', function(req, res) {
	delay(methods.put, req)
  .then((result) => sendResult(res, result));
});

router.delete('/:id', function(req, res) {
	delay(methods.delete, req)
  .then((result) => sendResult(res, result));
});

module.exports = router;
