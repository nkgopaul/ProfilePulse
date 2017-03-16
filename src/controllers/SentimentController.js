const config = require('../config');
const SentimentService = require('../services/SentimentService');

module.exports.analyzeTweets = function(req, res) {
  search_params = {
    screen_name: req.params.handle
  }
  var batchInput = [];
  var tweetIds = [];
  config.client.get('statuses/user_timeline', search_params, function(error, tweets, response) {
    for(var i = 0; i < tweets.length; i++) {
      batchInput.push(tweets[i].text);
      tweetIds.push(tweets[i].id_str);
    }
    config.indico.emotion(batchInput)
      .then((analysis) => {
        res.send(SentimentService.reduceInput(analysis, tweetIds));
      })
      .catch(error);
  });
}
