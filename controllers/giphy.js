var express = require('express');
var router = express.Router();
var request = require('request');

router.route('/:query')
  .get(function(req, res) {
    request('http://api.giphy.com/v1/gifs/search?q='+req.params.query+'&api_key=dc6zaTOxFJmzC&limit=1&offset='+Math.floor(Math.random()*10).toString(), function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body).data[0]) // Show the HTML for the Google homepage.
      } else {
        console.log(error);
      }
    })
 });

  module.exports = router;
