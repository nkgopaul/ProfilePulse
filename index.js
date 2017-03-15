require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var SentimentController = require('./src/controllers/SentimentController.js');
var Twitter = require('twitter');
var path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (request, response) => {
  response.send("pong");
});

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.get('/:handle', SentimentController.analyzeTweets);

app.listen(app.get('port'), function() {
  console.log("Express server is running on port " + app.get('port'));
})
