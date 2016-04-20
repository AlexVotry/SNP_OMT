(function(d3) {
  $('body').on('click', function() {
    console.log('working');
  });
  $.get('http://localhost:3000/reports', function(stuff) {
    // var dataset = data.data;
    console.log(stuff);
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;

    //color palette
    var color = d3.scale.category10();

    // Alternative
    // var color = d3.scale.ordinal()
    //   .range(['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C']);

    var svg = d3.select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var donutWidth = 95;

    var arc = d3.svg.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.layout.pie()
      .value(function(d) { return d.count; })
      .sort(null);

    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) {
        return color(d.data.label);
    });

    var legendRectSize = 18;
    var legendSpacing = 4;

    var legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        var horz = -2 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });
  });
})(window.d3);