$(document).ready(function() {
  $('#submit').click(function(){
    if(!$('#handle_input').val()) {
      console.log("Error: enter input");
      return;
    }

    $.get('/' + $('#handle_input').val(), function(data, status) {
      $( ".graph" ).remove();
      $( "#tweet" ).remove();
      var dataArr = [];
      var labelsArr = ["angry", "fear", "joy", "sadness", "surprise"];

      for (var e in data) {
        dataArr.push(data[e].sum);
      }

      var svg = d3.select(".graphcontent").append("svg")
        .attr("class", "graph")
        .attr("height", "100%")
        .attr("width", "100%");

      svg.selectAll("rect")
        .data(dataArr)
        .enter().append("rect")
          .attr("class", "bars")
          .attr("height", function(d, i) {return (d*50)})
          .attr("width","50")
          .attr("x",function(d, i) {return (i * 60) + 35})
          .attr("y",function(d, i) {return 400 - (d * 50)})
          .on("click", function() {
            $("#tweet").remove();

            if(this.id == labelsArr[0]) {
              var tweetElem = $("<li>", {id: "tweet", "tweetID": data.angry.strongestTweet});
              $(".tweetcontent").append(tweetElem);
            }
            if(this.id == labelsArr[1]) {
              var tweetElem = $("<li>", {id: "tweet", "tweetID": data.fear.strongestTweet});
              $(".tweetcontent").append(tweetElem);
            }
            if(this.id == labelsArr[2]) {
              var tweetElem = $("<li>", {id: "tweet", "tweetID": data.joy.strongestTweet});
              $(".tweetcontent").append(tweetElem);
            }
            if(this.id == labelsArr[3]) {
              var tweetElem = $("<li>", {id: "tweet", "tweetID": data.sadness.strongestTweet});
              $(".tweetcontent").append(tweetElem);
            }
            if(this.id == labelsArr[4]) {
              var tweetElem = $("<li>", {id: "tweet", "tweetID": data.surprise.strongestTweet});
              $(".tweetcontent").append(tweetElem);
            }
            renderTweet();
          });

      var bars = document.getElementsByClassName('bars');
      bars[0].id += labelsArr[0];
      bars[1].id += labelsArr[1];
      bars[2].id += labelsArr[2];
      bars[3].id += labelsArr[3];
      bars[4].id += labelsArr[4];

      svg.selectAll("text")
        .data(labelsArr)
        .enter().append("text")
        .text(function(d) {return d;})
          .attr("x",function(d, i) {return (i * 60) + 35})
          .attr("y","425");
    });
  });
});

function renderTweet(){

  var tweet = document.getElementById("tweet");
  var id = tweet.getAttribute("tweetID");

  twttr.widgets.createTweet(
    id, tweet,
    {
      conversation : 'none',    // or all
      cards        : 'hidden',  // or visible
      linkColor    : '#cc0000', // default is blue
      theme        : 'light'    // or dark
    })
  // .then (function (el) {
  //   el.contentDocument.querySelector(".footer").style.display = "none";
  // });
};
