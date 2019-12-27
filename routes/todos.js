const express = require('express');
const router = express.Router();
const server = require('../todoServer');

const methods = server();

function delay(method, req) {
	return new Promise(resolve => {
		setTimeout(() => resolve(method(req)), 500);
  });
} 

router.get('/', function(req, res) {
	delay(methods.get, req)
  .then((result) => {
    if (result[0] < 300) res.send(result[1]);
    else res.status(result[0]).send(result[1]);
  });
});

router.get('/:id', function(req, res) {
	delay(methods.get, req)
  .then((result) => {
    if (result[0] < 300) res.send(result[1]);
    else res.status(result[0]).send(result[1]);
  });  
});

router.post('/', function(req, res) {
	delay(methods.post, req)
  .then((result) => {
    if (result[0] < 300) res.send(result[1]);
    else res.status(result[0]).send(result[1]);
  });  
});

router.put('/:id', function(req, res) {
	delay(methods.put, req)
  .then((result) => {
    if (result[0] < 300) res.send(result[1]);
    else res.status(result[0]).send(result[1]);
  });  
});

router.delete('/:id', function(req, res) {
	delay(methods.delete, req)
  .then((result) => {
    if (result[0] < 300) res.send(result[1]);
    else res.status(result[0]).send(result[1]);
  });  
});

module.exports = router;
