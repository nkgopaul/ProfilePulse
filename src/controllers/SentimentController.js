const config = require('../config');
const SentimentService = require('../services/SentimentService');

module.exports.analyzeTweets = function(req, res) {
  search_params = {
    screen_name: req.params.handle
  }
  var batchInput = [];
  config.client.get('statuses/user_timeline', search_params, function(error, tweets, response) {
    console.log(tweets);
    for(var i = 0; i < tweets.length; i++) {
      batchInput.push(tweets[i].text);
    }
    config.indico.emotion(batchInput)
      .then((analysis) => {
        console.log(analysis);
        res.send(SentimentService.reduceInput(analysis, batchInput));
      })
      .catch(error);
  });
}
//get strongest tweet for each emotion
//sum up values for all emotions and isplay it on a graph

// stream_params = {
//   locations: '-74,40,-73,41'
// }
// config.client.stream('statuses/filter', stream_params, function(stream) {
//   stream.on('data', function(event) {
//     console.log(event.text);
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
// });
