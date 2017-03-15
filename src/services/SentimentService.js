function indexOfMax (arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

module.exports.reduceInput = (analysis, tweets) => {
  var anger = analysis.map((a) => (a.anger));
  var joy = analysis.map((a) => (a.joy));
  var sadness = analysis.map((a) => (a.sadness));
  var fear = analysis.map((a) => (a.fear));
  var surprise = analysis.map((a) => (a.surprise));

  var response = {
    "angry": {
      "sum": anger.reduce(function(a, b) { return a + b; }, 0),
      "strongestTweet": tweets[indexOfMax(anger)]
    },
    "joy": {
      "sum": joy.reduce(function(a, b) { return a + b; }, 0),
      "strongestTweet": tweets[indexOfMax(joy)]
    },
    "sadness": {
      "sum": sadness.reduce(function(a, b) { return a + b; }, 0),
      "strongestTweet": tweets[indexOfMax(sadness)]
    },
    "fear": {
      "sum": fear.reduce(function(a, b) { return a + b; }, 0),
      "strongestTweet": tweets[indexOfMax(fear)]
    },
    "surprise": {
      "sum": surprise.reduce(function(a, b) { return a + b; }, 0),
      "strongestTweet": tweets[indexOfMax(surprise)]
    }
  };
  return response;
}
