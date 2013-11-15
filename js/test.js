var data = [[1,1],[2,2],[3,3],[4,4],[5,5]],csvfile=null,svg=null,x=null,x2=null,y = null,y2 = null,xAxis = null,xAxis2 = null,yAxis = null, area = null,area2= null,context = null,brush = null,focus = null;
function createSVG(){
	var margin = {top: 10, right: 10, bottom: 100, left: 40},
	    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
	    width = 640 - margin.left - margin.right,
	    height = 480 - margin.top - margin.bottom,
	    height2 = 480 - margin2.top - margin2.bottom;
	    
	svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom);
	
	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	    .append("rect")
	    .attr("width", width)
	    .attr("height", height);
	
	focus = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	context = svg.append("g")
	    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
	    
	createAxis(height, height2, width); 
}
function createAxis(height, height2, width){
	
	x = d3.scale.linear().range([0, width]);
	x2 = d3.scale.linear().range([0, width]);
	y = d3.scale.linear().range([height, 0]);
	y2 = d3.scale.linear().range([height2, 0]);
	
	xAxis = d3.svg.axis().scale(x).orient("bottom");
	xAxis2 = d3.svg.axis().scale(x2).orient("bottom");
	yAxis = d3.svg.axis().scale(y).orient("left");
	
	brush = d3.svg.brush()
	    .x(x2)
	    .on("brush", brushed);
	
	area = d3.svg.area()
	    .interpolate("monotone")
	    .x(function(d) { return x(d.x); })
	    .y0(height)
	    .y1(function(d) { return y(d.y); });
	
	area2 = d3.svg.area()
	    .interpolate("monotone")
	    .x(function(d) { return x2(d.x); })
	    .y0(height2)
	    .y1(function(d) { return y2(d.y); }); 
	   
	createFilledLineChart(height,height2);    	
}
function createFilledLineChart(height, height2){
	//If values are date - Save for later
	//var parseDate = d3.time.format("%b %Y").parse;
	
	var cX = "X";
	var cY = "X";	
	
    data.forEach(function(d) {		    
	    d.x = +d[cX];
	    d.y = +d[cY];		    
	    		    
	  });
	
	  x.domain(d3.extent(data.map(function(d) { return d.x; })));
	  y.domain([0, d3.max(data.map(function(d) { return d.y; }))]);
	  x2.domain(x.domain());
	  y2.domain(y.domain());
	
	  focus.append("path")
	      .datum(data)
	      .attr("clip-path", "url(#clip)")
	      .attr("d", area);
	
	  focus.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);
	
	  focus.append("g")
	      .attr("class", "y axis")
	      .call(yAxis);
	
	  context.append("path")
	      .datum(data)
	      .attr("d", area2);
	
	  context.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height2 + ")")
	      .call(xAxis2);
	
	  context.append("g")
	      .attr("class", "x brush")
	      .call(brush)
	    .selectAll("rect")
	      .attr("y", -6)
	      .attr("height", height2 + 7);            
	  
}
function brushed() {
	  x.domain(brush.empty() ? x2.domain() : brush.extent());
	  focus.select("path").attr("d", area);
	  focus.select(".x.axis").call(xAxis);
}