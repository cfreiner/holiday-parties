var express = require('express');
var Party = require('../models/party');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Party.find(function(err, partys) {
      if (err) return res.status(500).send(err);
      res.send(partys);
    });
  })
  .post(function(req, res) {
    Party.create(req.body, function(err, party) {
      if (err) return res.status(500).send(err);
      res.send(party);
    });
  });

router.route('/:id') 
  .get(function(req, res) {
    Party.findById(req.params.id, function(err, party) {
      if (err) return res.status(500).send(err);
      res.send(party);
    });
  })
  .put(function(req, res) {
    Party.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Party.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;
