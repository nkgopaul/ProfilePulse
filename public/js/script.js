$(document).ready(function() {
  $('#submit').click(function(){
    $.get('/' + $('#handle_input').val(), function(data, status) {
      $( ".graph" ).remove();

      var dataArr = [];
      var labelsArr = ["angry", "fear", "joy", "sadness", "surprise"];

      console.log(data);
      for (var e in data) {
        dataArr.push(data[e].sum);
      }
      console.log(dataArr);

      var svg = d3.select(".content").append("svg")
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
          .attr("y",function(d, i) {return 400 - (d * 50)});

      svg.selectAll("text")
        .data(labelsArr)
        .enter().append("text")
        .text(function(d) {return d;})
          .attr("x",function(d, i) {return (i * 60) + 35})
          .attr("y","425");
    });
  });
});
