var Twitter = require('twitter');
var indico = require('indico.io');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

indico.apiKey = process.env.INDICO_ACCESS_TOKEN

exports.client = client;
exports.indico = indico;
