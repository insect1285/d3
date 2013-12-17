
//Parses CSV file and displays data to user.  Asks user to choose columns for chart.
//Global Variables
var data = null; //Users data
var svg = null; //SVG that all charts are built in
var x = null; //x-axis values
var x2 = null; //second x-axis values
var y = null; //y-axis values
var y2 = null; //second y-axis values
var xAxis = null;
var xAxis2 = null;
var yAxis = null;
var area = null; //primary chart area
var area2= null; //secondary chart area
var line = null;
var line2 = null;
var sym = null;
var symXY = null;
var symXY2 = null;
var context = null;
var brush = null;
var focus = null;
//All options that affect chart/symbol appearances
var chartOptions = { 
	fColor: 'black', //fill color for chart
	sColor: 'black', //stroke color for chart
	marker: "circle",
<<<<<<< HEAD
	markerSize: 75,
	lineThickness: 4
=======
	markerSize: 75	
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
};
//All options that affect axis appearances/labels
var axisOptions = {
	xlbl: "", //x/y axis label
	ylbl: "",	
	ylblp: "", //x/y lable position (left, middle, right/Top, center, bottom)
	xlblp: "",
	ylblfs: "1", //x/y label font size
	xlblfs: "1",
	ylblrot: "Yes", //x/y label rotate 90 deg.
	xlblrot: "No",
	xMinVal: null, //x/y label mix/max values
	xMaxVal: null,
	yMinVal: null,
	yMaxVal: null
};

var cX = null;
var cY = null;
var height = null;
var height2 = null;
<<<<<<< HEAD
//object of strings that will be used to output the code for people to copy/paste for their own use.
var strCode = {
	svg: '',
	axis: '',
	chart: '',
	brushed: '',
	addons: '',
	xdomain: '',
	ydomain: ''
};
var strData = [];
=======
var strData = null;

>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
var xValType = "";
var yValType = "";
var xValTypeChanged = false; //track when data type changes in order to reset min/max
var yValTypeChanged = false;
<<<<<<< HEAD

=======
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
//RegEx for date validation
//var dateRE = "^((((0[13578])|([13578])|(1[02]))[\/](([1-9])|([0-2][0-9])|(3[01])))|(((0[469])|([469])|(11))[\/](([1-9])|([0-2][0-9])|(30)))|((2|02)[\/](([1-9])|([0-2][0-9]))))[\/]\d{4}$|^\d{4}$";

function parseCSV(file){
	//alert(file);
	//Reads CSV file and assigns to object literal
	var csvfile = file;
	$.get(csvfile,function(filedata){		
		data = $.csv.toObjects(filedata);
		if(data == null || data == ""){			
			$('#fUpload').show();
			$('.success').attr('class','error');			
			$('.error').html("It appears your CSV file contains no data!  Please check your file and then try again!");
			return;
		} else {
			createData();
		}
	});
}
function createData(){
	$('#dataTitle').html("<h3>Your Data</h3><div id='data' class='data'> </div>");
	var html = '<table>';
	var O ='';
	for (var k in data[0]){					
		html += '<th>'+ k + '</th>';
		O += '<option>' + k + '</option>';
	}		
	for(var r in data){
		html += '<tr>\r\n';			
		for (var i in data[r]){				
			html += '<td>' + data[r][i] + '</td>\r\n';			
		}
		html += '</tr>\r\n';
	}
	html += '</table>';
	
	//SHOW DATA TO USER
	$('#data').append(html);
	//Customize Chart
	initSetup(O);
	createSVG();					
}

//CREATE OPTIONS AND TEMPLATE FOR CHART
function initSetup(O){	
	var chartoptions = ['Scatter Plot','Basic Line','Filled Line','Multi-Line (NYI)','Bar'];
	var co = '';		
	for (var c in chartoptions){
		co += '<option>' + chartoptions[c] + '</options>';
	}
	//Select Chart Type - Options will depend on chart type chosen
	$('#iChoices').append(
				'<span>Which type of chart do you want to create? ' +
				'<select id="cOption" onchange="resetChart()">' + co + '</select> </span>');				
	
	//Axis options
	$('#iChoices').append(
		'<span id="HC" class="cChoice">Horizontal Axis Data: <select id="selX" onchange="resetChart()">' + 
		O + '</select>  ' +
		'Vertical Axis Data: <select id="selY" onchange="resetChart()">' + 
		O + '</select></span>'
	);
			
}

function createPopupOptions(){
	$('#overlay, #overlayOptions').fadeIn(500);
}
function overlayClose(){
	$('#overlayOptions, #overlay').fadeOut(500);	
}
function featureOptions(chartType){
	$('#overlayOptions').empty();
	$('#overlayOptions').append('<h3>Feature Options</h3><img id="close-btn" onClick="overlayClose()" src="images/close-button-blue-md.png" width="40px" height="40px" alt="Close" title="Close" />');
	var lT = [1,2,3,4,5,6,7,8,9,10];
	var olT = '';
	for (var k = 0; k<lT.length; k++){
				if(k==chartOptions.lineThickness){
					olT += '<option selected>'+chartOptions.lineThickness+'</option>';
				} else {
					olT += '<option>'+lT[k]+'</option>';
				}
				
		}
	var markers = d3.svg.symbolTypes;
	var markerOptions ='';
	for (var k = 0; k<markers.length; k++){
				if(chartOptions.marker == markers[k]){
					markerOptions += '<option selected>'+markers[k].charAt(0).toUpperCase() + markers[k].slice(1)+'</option>';
				} else {
					markerOptions += '<option>'+markers[k].charAt(0).toUpperCase() + markers[k].slice(1)+'</option>';
				}
				
		}
	switch(chartType){
		case "Scatter":
			$('#overlayOptions').append('<p id="fillColor"></p>');
			colorChoice('#fillColor','Marker');
			$('#overlayOptions').append('<p id="strokeColor"></p>');
			colorChoice('#strokeColor','Marker');			
			$('#overlayOptions').append('<p class="cChoice">Line Weight: <select id="lineThickness" onchange="changeLT()">'+olT+'</select></p>');
			$('#overlayOptions').append('<p class="cChoice">Marker Type: <select id="markerType" onchange="changeMarker()">'+markerOptions+'</select></p>');
			$('#overlayOptions').append('<p class="cChoice">Marker Size: <input id="markerSize" onchange="changeMarker()" value="'+chartOptions.markerSize+'"/></p>');			
			break;
		case "Line":
			$('#overlayOptions').append('<p id="strokeColor"></p>');
			colorChoice('#strokeColor','Line');
			$('#overlayOptions').append('<p class="cChoice">Line Weight: <select id="lineThickness" onchange="changeLT()">'+olT+'</select></p>');
			break;
		case "Filled":
			$('#overlayOptions').append('<p id="fillColor"></p>');
			colorChoice('#fillColor','Fill');
			break;
	};	
	
	//$('#overlayOptions').append('<p class="cChoice"><input type="checkbox"> Show data labels (NYI)</input></p>');
}
function changeLT(){
	if($('#lineThickness').val()){
		chartOptions.lineThickness = $('#lineThickness').val();
	}
	focus.selectAll("#scatter")
		.attr("stroke-width",chartOptions.lineThickness);
	focus.selectAll("#line")
		.attr("stroke-width",chartOptions.lineThickness);
}
function changeMarker(){
	if($('#markerType').val()){
		chartOptions.marker = $('#markerType').val();
<<<<<<< HEAD
	}
	if($('#markerSize').val()){
		chartOptions.markerSize = $('#markerSize').val();
	}
=======
	}
	if($('#markerSize').val()){
		chartOptions.markerSize = $('#markerSize').val();
	}
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
	chartOptions.marker = chartOptions.marker.charAt(0).toLowerCase() + chartOptions.marker.slice(1);
	sym = d3.svg.symbol()
			.type(chartOptions.marker)
			.size(chartOptions.markerSize);
	focus.selectAll("#scatter")
		.attr("d",sym);
	context.selectAll("#scatter")
		.attr("d",sym);
}
function chartOptions(){
	//Future function for adding chart titles, etc.
	//Chart Title

	
}
//X-Axis options
function xaxisOptions(){
	$('#overlayOptions').empty(); //empty overlay to setup new options based on data
	$('#overlayOptions').append('<h3>Horizontal Axis Options</h3><img id="close-btn" onClick="overlayClose()" src="images/close-button-blue-md.png" width="40px" height="40px" alt="Close" title="Close" />'); //close button
	
	//Axis Labels
	$('#overlayOptions').append('<p class="cChoice">Label: <input id="xlabel" onchange="changeXAL()" value="'+axisOptions.xlbl+'"></input></p>');
	var sel = '';
	if(axisOptions.xlblrot == "No"){
		sel = '<option>Yes</option><option selected>No</option>';	
	} else {
		sel = '<option selected>Yes</option><option>No</option>';
	}
	$('#overlayOptions').append('<p class="cChoice">Rotate Label: <select id="xlabelrot" onchange="changeXAL()">'+sel+'</select></p>');	
	if(axisOptions.xlblp == "Left"){
		sel = '<option selected>Left</option><option>Center</option><option>Right</option>';
	} else if(axisOptions.xlblp == "Center"){
		sel = '<option>Left</option><option selected>Center</option><option>Right</option>';
	} else {
		sel = '<option>Left</option><option>Center</option><option selected>Right</option>';
	}
	$('#overlayOptions').append('<p class="cChoice">Label Position: <select id="xlabelpos" onchange="changeXAL()">'+sel+'</select></p>');
	$('#overlayOptions').append('<p class="cChoice">Label Size: <input id="xlabelfs" onchange="changeXAL()" value="'+axisOptions.xlblfs+'"></input></p>');
	//Axis Scale - Start with Default
	if (xValType != "string"){
		if(xValTypeChanged == true){
			axisOptions.xMinVal = d3.min(data.map(function(d){return d.x;}));
			axisOptions.xMaxVal = d3.max(data.map(function(d){return d.x;}));
		}
		if (xValType == "date"){	
			$('#overlayOptions').append('<p class="cChoice">Scale Min: <input id="xmin" type="date" onchange="changeXAL()" value="' + axisOptions.xMinVal.toString('yyyy-MM-dd') + '"></input></p>');
			$('#overlayOptions').append('<p class="cChoice">Scale Max: <input id="xmax" type="date" onchange="changeXAL()" value="' + axisOptions.xMaxVal.toString('yyyy-MM-dd') + '"></input></p>');
		} else {
			$('#overlayOptions').append('<p class="cChoice">Scale Min: <input id="xmin" onchange="changeXAL()" value="'+axisOptions.xMinVal+'"></input></p>');
			$('#overlayOptions').append('<p class="cChoice">Scale Max: <input id="xmax" onchange="changeXAL()" value="'+axisOptions.xMaxVal+'"></input></p>');
		}
	}
	//Axis Color
	
	///////////////////////////////
	//Options for advanced charts
	
	//Category axis (i.e., multi-line - which field should each line be?)	

	
}
//Y-axis options
function yaxisOptions(){
	$('#overlayOptions').empty(); 
	$('#overlayOptions').append('<h3>Veritcal Axis Options</h3><img id="close-btn" onClick="overlayClose()" src="images/close-button-blue-md.png" width="40px" height="40px" alt="Close" title="Close" />');
	
	//Axis Labels
	$('#overlayOptions').append('<p class="cChoice">Label: <input id="ylabel" onchange="changeYAL()" value="'+axisOptions.ylbl+'"></input></p>');
	var sel = '';
	if(axisOptions.ylblrot == "No"){
		sel = '<option>Yes</option><option selected>No</option>';	
	} else {
		sel = '<option selected>Yes</option><option>No</option>';
	}
	$('#overlayOptions').append('<p class="cChoice">Rotate Label: <select id="ylabelrot" onchange="changeYAL()">'+sel+'</select></p>');	
	if(axisOptions.ylblp == "Top"){
		sel = '<option selected>Top</option><option>Middle</option><option>Bottom</option>';
	} else if(axisOptions.ylblp == "Middle"){
		sel = '<option>Top</option><option selected>Middle</option><option>Bottom</option>';
	} else {
		sel = '<option>Top</option><option>Middle</option><option selected>Bottom</option>';
	}
	$('#overlayOptions').append('<p class="cChoice">Label Position: <select id="ylabelpos" onchange="changeYAL()">'+sel+'</select></p>');
	$('#overlayOptions').append('<p class="cChoice">Label Size: <input id="ylabelfs" onchange="changeYAL()" value="'+axisOptions.ylblfs+'"></input></p>');
	//Axis Scale - Start with Default
	if (yValType != "string"){	
		if(yValTypeChanged == true){
			axisOptions.yMinVal = d3.min(data.map(function(d){return d.y;}));
			axisOptions.yMaxVal = d3.max(data.map(function(d){return d.y;}));
		}
		if (yValType == "date"){						
			$('#overlayOptions').append('<p class="cChoice">Scale Min: <input id="ymin" type="date" onchange="changeYAL()" value="' + axisOptions.yMinVal.toString('yyyy-MM-dd') + '"></input></p>');
			$('#overlayOptions').append('<p class="cChoice">Scale Max: <input id="ymax" type="date" onchange="changeYAL()" value="' + axisOptions.yMaxVal.toString('yyyy-MM-dd') + '"></input></p>');
		} else {
			$('#overlayOptions').append('<p class="cChoice">Scale Min: <input id="ymin" onchange="changeYAL()" value="'+axisOptions.yMinVal+'"></input></p>');
			$('#overlayOptions').append('<p class="cChoice">Scale Max: <input id="ymax" onchange="changeYAL()" value="'+axisOptions.yMaxVal+'"></input></p>');
		}
	}
	//Axis Color
	
	///////////////////////////////
	//Options for advanced charts
	
	//Category axis (i.e., multi-line - which field should each line be?)	
	
}
function changeXAL(){
	focus.select('#xlbl').remove();
	if($('#xlabel').val()){
		axisOptions.xlbl = $('#xlabel').val();
	}
	if($('#xlabelpos').val()){
		axisOptions.xlblp = $('#xlabelpos').val();
	}
	if($('#xlabelfs').val()){
		axisOptions.xlblfs = $('#xlabelfs').val();
	}
	if($('#xlabelrot').val()){
		axisOptions.xlblrot = $('#xlabelrot').val();
	}
	//Only adjust min/max of axis if numbers or dates
	if(xValType != "string"){
		var xDom = x.domain();
		if(xValType == "date")
		{
			if($('#xmin').val()){
				axisOptions.xMinVal = Date.parse($('#xmin').val());
			} else {
				axisOptions.xMinVal = xDom[0];	
			}
			if($('#xmax').val()){
				axisOptions.xMaxVal = Date.parse($('#xmax').val());
			} else {		
				axisOptions.xMaxVal = xDom[1];	
			}
		} else {		
			if($('#xmin').val()){
				axisOptions.xMinVal = $('#xmin').val();
			} else {
				axisOptions.xMinVal = xDom[0];	
			}
			if($('#xmax').val()){
				axisOptions.xMaxVal = $('#xmax').val();
			} else {		
				axisOptions.xMaxVal = xDom[1];	
			}
		}
		x.domain([axisOptions.xMinVal,axisOptions.xMaxVal]);
		x2.domain(x.domain());
	}
	switch ($('#cOption').val()) {
	  		case "Filled Line":
	  			focus.select("path").attr("d", area);
	  			break;
  			case "Basic Line":
  				focus.select("path").attr("d", line);
				break;
			case "Scatter Plot":
				focus.selectAll("path").attr("transform", symXY);
				break;
			case "Bar":
				focus.selectAll("rect").attr("x", function(d) { return x(d.x); });			
				break;
	}
	var xRange = x.range();
	var xpos='';
	switch (axisOptions.xlblp){
		case "Left":
			xpos=xRange[0];
			break;
		case "Right":
			xpos=xRange[1];
			break;
		default:
			xpos = (xRange[0]+xRange[1]) / 2;
			break;
	}
	focus.select('#xaxis')
		.call(xAxis)
		.call(xAxis2)
		.append("text")
		.attr("font-size",axisOptions.xlblfs+"em")
		.attr("id","xlbl")		
      	.attr("x", xpos)
      	.attr("dy", "35")
      	//.attr("text-anchor", "middle")
      	.text(axisOptions.xlbl); 
          	 
   if(axisOptions.xlblrot == 'Yes'){
   		focus.select('#xlbl')
	   		.attr("y",-xpos)
	   		.attr("y",0)
	   		.attr("dy",0)
	   		.attr("dx", "-"+$('#xlabel').val().length+"em")
	   		.attr("transform", "rotate(-90)");
   }
}
function changeYAL(){
	focus.select('#ylbl').remove();
	if($('#ylabel').val()){
		axisOptions.ylbl = $('#ylabel').val();
	}
	if($('#ylabelpos').val()){
		axisOptions.ylblp = $('#ylabelpos').val();
	}
	if($('#ylabelfs').val()){
		axisOptions.ylblfs = $('#ylabelfs').val();
	}
	if($('#ylabelrot').val()){
		axisOptions.ylblrot = $('#ylabelrot').val();
	}
	//Adjust yaxis min/max if numbers or dates only
	if (yValType != "string"){
		var yDom = y.domain();
		if(yValType == "date")
		{
			if($('#ymin').val()){
				axisOptions.yMinVal = Date.parse($('#ymin').val());
			} else {
				axisOptions.yMinVal = yDom[0];	
			}
			if($('#ymax').val()){
				axisOptions.yMaxVal = Date.parse($('#ymax').val());
			} else {		
				axisOptions.yMaxVal = yDom[1];	
			}
		} else {		
			if($('#ymin').val()){
				axisOptions.yMinVal = $('#ymin').val();
			} else {
				axisOptions.yMinVal = yDom[0];	
			}
			if($('#ymax').val()){
				axisOptions.yMaxVal = $('#ymax').val();
			} else {		
				axisOptions.yMaxVal = yDom[1];	
			}
		}
		y.domain([axisOptions.yMinVal,axisOptions.yMaxVal]);
		y2.domain(y.domain());
	}	
	switch ($('#cOption').val()) {
	  		case "Filled Line":
	  			focus.select("path").attr("d", area);
	  			break;
  			case "Basic Line":
  				focus.select("path").attr("d", line);
				break;
			case "Scatter Plot":
				focus.selectAll("path").attr("transform", symXY);
				break;
			case "Bar":
				focus.selectAll("rect").attr("y", function(d) { return y(d.y); })
									   .attr("height", function(d) { return height - y(d.y); });
				break;				
	  }
	var yRange = y.range();
	var ypos='';
	switch (axisOptions.ylblp){
		case "Bottom":
			ypos=yRange[0];
			break;
		case "Top":
			ypos=yRange[1];
			break;
		default:
			ypos = (yRange[0]+yRange[1]) / 2;
			break;
	}
	focus.select('#yaxis')
		.call(yAxis)
		.append("text")
		.attr("font-size",axisOptions.ylblfs+"em")
		.attr("id","ylbl")		
      	.attr("y", ypos)
      	//.attr("dx", "-"+$('#ylabel').val().length+"em")
      	//.attr("text-anchor", "middle")
      	.text(axisOptions.ylbl); 
<<<<<<< HEAD
    
   if($('#ylabel').val()){
   		focus.select('#yaxis').attr("dx", "-"+$('#ylabel').val().length+"em");
   }
    
=======
      	 
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
   if(axisOptions.ylblrot == 'Yes'){
   		focus.select('#ylbl')
	   		.attr("x",-ypos)
	   		.attr("y",0)
	   		.attr("dx",0)
	   		.attr("dy", "-35")
	   		.attr("transform", "rotate(-90)");
   }
}

function colorChoice(cPart, type){
	var lbl = cPart.substring(1,cPart.indexOf('Color'));
	var iColor = chartOptions.fColor;
	if (lbl == 'stroke'){lbl = "line"; iColor = chartOptions.sColor;}
	lbl = lbl.charAt(0).toUpperCase() + lbl.slice(1);
	$(cPart).append('<div class="cChoice">'+lbl+' Color: '+
		'<input id="chartColor'+cPart.substring(1)+'" type="text" ></div>');
	
	$('#chartColor'+cPart.substring(1)).spectrum({
	    color: iColor,
	    showButtons: false,
	    change: function(){
<<<<<<< HEAD
		    		//set Color variable, use if statements to avoid setting colors to null when colors are changed on chart types
		    		//	that do not support one or the other
		    		if(type == 'Fill' || type =='Marker'){
		    			chartOptions.fColor = $('#chartColorfillColor').spectrum("get");
		    		}
		    		if(type == 'Line'|| type =='Marker'){
		    			chartOptions.sColor = $('#chartColorstrokeColor').spectrum("get");
		    		}		    		
=======
		    		//set Color variable
		    		chartOptions.fColor = $('#chartColorfillColor').spectrum("get");
		    		chartOptions.sColor = $('#chartColorstrokeColor').spectrum("get");
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
		    		//Recreate data polygons
		    		switch(type){
		    			case 'Fill':
		    				focus.selectAll("path")
								.attr("fill",chartOptions.fColor);
							context.selectAll("path")
								.attr("fill",chartOptions.fColor);
							focus.selectAll("rect")
								.attr("fill",chartOptions.fColor);
							context.selectAll("rect")
								.attr("fill",chartOptions.fColor);
		    				break;
	    				case 'Line':
	    					focus.selectAll("path")
								.attr("stroke",chartOptions.sColor);
							context.selectAll("path")
								.attr("stroke",chartOptions.sColor);
	    					break;
	    				case 'Marker':
	    					focus.selectAll("path")
								.attr("fill",chartOptions.fColor);
							focus.selectAll("path")
								.attr("stroke",chartOptions.sColor);
							context.selectAll("path")
								.attr("fill",chartOptions.fColor);
							context.selectAll("path")
								.attr("stroke",chartOptions.sColor);
	    					break;
		    		};
		    		//Used to reset entire chart (inefficient, but might be necessary in extreme cases)
		    		//resetChart();
		    	}
	});
	$('#chartColor').on('click',function(e){
		e.stopPropagation();
	});
}
//REMOVES OLD CHART AND STARTS CODE TO MAKE NEW CHART
function resetChart(){
	$('#dCode').hide();
	$('svg').remove();
	createSVG();
}
//BEGIN MAKING NEW CHART BY ADDING SVG ELEMENT
function createSVG(){
	//Dimensional Variables
	var margin = {top: 10, right: 10, bottom: 100, left: 40},
	    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
	    width = 500 - margin.left - margin.right;
	    
    height = 500 - margin.top - margin.bottom;
    height2 = 500 - margin2.top - margin2.bottom;
    
	//Add SVG with chart    
	svg = d3.selectAll("#chart").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom);
	//Set up Clip for when brush is used
	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	    .append("rect")
	    .attr("width", width)
	    .attr("height", height);
	//Plot area for Primary plot
	focus = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	//Plot area for secondary plot
	context = svg.append("g")
	    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
	    
	createAxis(width);
	strCode.svg = createSVG.toString();	
}
//SETS UP X, SECONDARY X, AND Y AXIS
function createAxis(width){
	cX = $('#selX').val();
	cY = $('#selY').val();	
    strData = [];
	data.forEach(function(d){
		var dX = d[cX];
		var dY = d[cY];
		if(isNaN(dX)){
               var date = Date.parse(dX);
               if(date){
               	  //Parse Date and use timescale
			      d.x = date;			          		  
               }else {
               	  //use ordinal scale
                  d.x = dX;                              	                                                  
               }                         
         } else {
               //use linear scales
			   d.x = +dX;                
         }
         if(isNaN(dY)){
               var date = Date.parse(dY);
               if(date){
                      //Parse Date and use timescale
                      d.y = date;                      
               }else {
                      //use ordinal scale
                      d.y = dY;				                                                   
               }                         
         } else {
               //use linear scales  
			   d.y = +dY;                    
         }
         strData.push("["+d.x+"," +d.y +"]");    
	});

	var dX = data[0][cX];
	var dY = data[0][cY];
	if(isNaN(dX)){
           var date = Date.parse(dX);
           if(date){
           	  //Parse Date and use timescale
           	  x = d3.time.scale().range([0, width]);
			  x2 = d3.time.scale().range([0, width]);
		      //d.x = date; 
		      if(xValType != "date"){
		      	xValTypeChanged = true;
		      } else {
		      	xValTypeChanged = false;
		      }
           	  xValType = "date";           		  
           }else {
           	  //use ordinal scale
           	  x = d3.scale.ordinal().rangePoints([0, width]);
			  x2 = d3.scale.ordinal().rangePoints([0, width]);
              //d.x = dX;
              if(xValType != "string"){
		      	xValTypeChanged = true;
		      } else {
		      	xValTypeChanged = false;
		      }
           	  xValType = "string";                               	                                                  
           }                         
     } else {
           //use linear scales
           x = d3.scale.linear().range([0, width]);//Linear Primary X axis
		   x2 = d3.scale.linear().range([0, width]); //Linear Secondary X axis
		  // d.x = +dX;
		   if(xValType != "number"){
		      	xValTypeChanged = true;
		      } else {
		      	xValTypeChanged = false;
		      }
           xValType = "number";                 
     }
     if(isNaN(dY)){
           var date = Date.parse(dY);
           if(date){
                  //Parse Date and use timescale
                  y = d3.time.scale().range([height,0]);
				  y2 = d3.time.scale().range([height2,0]);
                  //d.y = date;
                  if(yValType != "date"){
		      			yValTypeChanged = true;
		      	  } else {
		      			yValTypeChanged = false;
		      	  }
                  yValType = "date";
                  
           }else {
                  //use ordinal scale
                  y = d3.scale.ordinal().rangePoints([height, 0]);
			  	  y2 = d3.scale.ordinal().rangePoints([height2, 0]);
                  //d.y = dY;
                  if(yValType != "string"){
		      			yValTypeChanged = true;
		      	  } else {
		      			yValTypeChanged = false;
		      	  }
                  yValType = "string";					                                                   
           }                         
     } else {
           //use linear scales
           y = d3.scale.linear().range([height, 0]); //Linear Y Axis
		   y2 = d3.scale.linear().range([height2, 0]); // Linear Secondary Y axis   
		   //d.y = +dY;
		   if(yValType != "number"){
      			yValTypeChanged = true;
      	   } else {
      			yValTypeChanged = false;
      	   }
           yValType = "number";                     
     } 


	if(xValType != "string"){
		setXDomain();
	} else {
		setXOrdinalDomain();
	}
	if(yValType != "string"){
		setYDomain();
	} else {
		setYOrdinalDomain();
	}
	//Scales and determines placement of axis (secondary y-axis will not be shown)
	xAxis = d3.svg.axis().scale(x).orient("bottom"); 
	xAxis2 = d3.svg.axis().scale(x2).orient("bottom"); 
	yAxis = d3.svg.axis().scale(y).orient("left");
	
	createBrush(); 
	chartChoice();

	strCode.axis = createAxis.toString();
	strCode.axis = strCode.axis.replace("var cX = $('#selX').val()","var cX = '" +cX+"'");
	strCode.axis = strCode.axis.replace("var cY = $('#selY').val()","var cY = '" +cY+"'");  
}

function addons(){
	//CONTEXT - Add brush feature to secondary plot
	context.append("g")
		.attr("class", "x brush")
		.call(brush)
		.selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);
        
    //FOCUS - Add x-axis to primary plot
  	focus.append("g")
  		.attr("id","xaxis")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    	.on("dblclick",function(){
    		createPopupOptions();
	      	xaxisOptions();
    	});
    
    //FOCUS - Add y-Axis to primary plot
    focus.append("g")
    	.attr("id","yaxis")
        .attr("class", "y axis")
        .call(yAxis)
        .on("dblclick",function(){
    		createPopupOptions();
	      	yaxisOptions();
    	});
    
    //CONTEXT - Add X axis to secondary plot		
	context.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height2 + ")")
	      .call(xAxis2);
	      
	//Call options functions to set values to previously chosen values (or defaults if no choices yet)
		
	changeXAL();	
	changeYAL();		
	changeLT();
	changeMarker();	
	strCode.addons = addons.toString();	
		
	outCode();
}
//SETS X AND Y DOMAIN TO BE EXTENT OF DATA
function setXDomain(){
	x.domain(d3.extent(data.map(function(d) { return d.x; })));
	x2.domain(x.domain());
	strCode.xdomain = setXDomain.toString();
	return;	
}
function setXOrdinalDomain(){
	x.domain(data.map(function(d) { return d.x; }));
	x2.domain(x.domain());
	strCode.xdomain = setXOrdinalDomain.toString();
	return;		 
}
function setYDomain(){
	y.domain(d3.extent(data.map(function(d) { return d.y; })));
	y2.domain(y.domain());
	strCode.ydomain = setYDomain.toString();
	return;	 
}
function setYOrdinalDomain(){
	y.domain(data.map(function(d) { return d.y; }));
	y2.domain(y.domain());
	strCode.ydomain = setYOrdinalDomain.toString();
	return;	 
}
//EXECUTES CODE BASED ON USER CHART SELECTION
function chartChoice(){	
	switch ($('#cOption').val()){
		case 'Filled Line':	
			createFilledLineChart();
			break;
		case 'Basic Line':			
			createLineChart();
			break;
		case 'Scatter Plot':
			createScatter();
			break;
		case 'Bar':
			createBarChart();
			break;
		default:
			alert('Sorry - That chart is not yet implemented, please choose another!');
			break;
	}	
}
//CREATES BRUSH ON SECOND CHART
function createBrush(){
	brush = d3.svg.brush()
	    .x(x2)
	    .on("brush", brushed);
	strCode.brushed = createBrush.toString();
}
//BAR CHART CODE
function createBarChart(){
	
  focus.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("clip-path", "url(#clip)")
      .attr("fill", chartOptions.fColor)
      .attr("x", function(d) { return x(d.x); })
      .attr("width", 25)
      .attr("y", function(d) { return y(d.y); })
      .attr("height", function(d) { return height - y(d.y); })
      .on("dblclick", function(){
	      	createPopupOptions();
	      	featureOptions('Filled');
	      });
    
  context.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("fill", chartOptions.fColor)
      .attr("x", function(d) { return x2(d.x); })
      .attr("width", 25)
      .attr("y", function(d) { return y2(d.y); })
      .attr("height", function(d) { return height2 - y2(d.y); });
      
    
      addons();
      strCode.chart = createBarChart.toString();                  
}
//FILLED LINE CHART CODE
function createFilledLineChart(){
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
	
	  focus.append("path")
	      .datum(data)
	      .attr("clip-path", "url(#clip)")
	      .attr("id","fill")
	      .attr("d", area)
	      .attr("fill",chartOptions.fColor)
	      .on("dblclick", function(){
	      	createPopupOptions();
	      	featureOptions('Filled');
	      });
	
	  context.append("path")
	      .datum(data)
	      .attr("id","fill")
<<<<<<< HEAD
	      .attr("fill",chartOptions.fColor)
=======
	      //.attr("fill",chartOptions.fColor)
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
	      .attr("d", area2);
	      
	  
	  //Add Brush after secondary plot is finished or cursor doesn't funtion when mousing over data
	  //Refreshes axis to get scale based on data
	  addons();
	  strCode.chart = createFilledLineChart.toString();                  
}
//LINE CHART CODE
function createLineChart(){
	  line = d3.svg.line()
    	.x(function(d) { return x(d.x); })
    	.y(function(d) { return y(d.y); });	
      line2 = d3.svg.line()
    	.x(function(d) { return x2(d.x); })
    	.y(function(d) { return y2(d.y); }); 	
	     
	  focus.append("path")
	      .datum(data)
	      .attr("clip-path", "url(#clip)")
	      .attr("d", line)
	      .attr("id","line")
<<<<<<< HEAD
	      .attr("stroke-width",chartOptions.lineThickness)
=======
	      .attr("stroke-width",4)
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
	      .attr("stroke", chartOptions.sColor)
	      .attr("fill","none")
	      .on("dblclick", function(){
	      	createPopupOptions();
	      	featureOptions('Line');
	      });
	
	  context.append("path")
	      .datum(data)
	      .attr("id","line")
	      .attr("d", line2)
	      .attr("stroke-width",2)
	      .attr("stroke", chartOptions.sColor)
	      .attr("fill","none");
	      
	  
	  //Add Brush after secondary plot is finished or cursor doesn't funtion when mousing over data
	  //Refreshes axis to get scale based on data
	  addons();
	  strCode.chart = createLineChart.toString(); 
}
function createScatter(){
	
	sym = d3.svg.symbol()
			.type(chartOptions.marker)
			.size(chartOptions.markerSize);
	
	symXY = function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; };
	
	symXY2 = function(d) { return "translate(" + x2(d.x) + "," + y2(d.y) + ")"; };
	
	focus.selectAll("path")
      .data(data)
  	  .enter().append("path")   	    	  
  	  .attr("id","scatter")
      .attr("transform", symXY)
      .attr("d", sym)
      .attr("stroke", chartOptions.sColor)
<<<<<<< HEAD
      .attr("stroke-width",chartOptions.lineThickness)
=======
      .attr("stroke-width",4)
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
      .attr("fill",chartOptions.fColor)
      .on("dblclick", function(){
      	createPopupOptions();
      	featureOptions('Scatter');
      }); 
      
    context.selectAll("path")
      .data(data)
  	  .enter().append("path")
  	  .attr("id","scatter")
      .attr("transform", symXY2)
      .attr("d", sym)
      .attr("fill",chartOptions.fColor)
      .attr("stroke", chartOptions.sColor)      
      .attr("stroke-width",2);
<<<<<<< HEAD
=======
      
>>>>>>> 0b4768f3cba047e919c8c1695d96a11e2639effe
      
      addons();
      strCode.chart = createScatter.toString();                  
}
//BRUSHED CODE
function brushed() {
	  x.domain(brush.empty() ? x2.domain() : brush.extent());
	  strCode.brushed = strCode.brushed + 'x.domain(brush.empty() ? x2.domain() : brush.extent());'; 
	  switch ($('#cOption').val()) {
	  		case "Filled Line":
	  			focus.select("path").attr("d", area);
	  			strCode.brushed = strCode.brushed + 'focus.select("path").attr("d", area);';
	  			break;
  			case "Basic Line":
  				focus.select("path").attr("d", line);
  				strCode.brushed = strCode.brushed + 'focus.select("path").attr("d", line);';
				break;
			case "Scatter Plot":
				focus.selectAll("path").attr("transform", symXY);
				strCode.brushed = strCode.brushed + 'focus.selectAll("path").attr("transform", symXY);';
				break;
			case "Bar":
				focus.selectAll("rect").attr("x", function(d) { return x(d.x); });
				strCode.brushed = strCode.brushed + 'focus.selectAll("rect").attr("x", function(d) { return x(d.x); });';
				break;				
	  }
	  focus.select("#xaxis").call(xAxis); 
	  strCode.brushed = strCode.brushed + 'focus.select("#xaxis").call(xAxis);'; 	  
}

//CREATE EXPORT CODE
function outCode(){
	var code = "var data = ["+strData +"],csvfile=null,svg=null,x=null,x2=null,y = null,y2 = null,xAxis = null,xAxis2 = null,yAxis = null, area = null," +
					"area2= null,context = null,brush = null,focus = null;\r\n"+strCode.svg+"\r\n"+strCode.axis+"\r\n"+strCode.chart+"\r\n"+strCode.addons+"\r\n"+strCode.brushed;
	$("#dCode").append("<br />Copy and paste this code to a .js file for your site.  Include the script on your HTML page and call the function 'createSVG()' to include this chart on your website:<br /><pre><code>"+code+"</pre></code>");
}

