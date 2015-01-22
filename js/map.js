var map = {
	svg: '',
	svgContainer: '',
	element: '#map',
	scale: null,
	hexRadius: 0
}


//The number of columns and rows of the heatmap
var MapColumns = 40,
	MapRows = 50;

var colorWater = "#69B5DB";
var colorLand = "#61CC1F";
//Random map
var randomMap = [];

for(var x = 0; x < MapColumns; x++)
{
	randomMap[x] = [];
	
	for(y = 0; y < MapRows; y++)
	{	
		var rand = Math.floor((Math.random() * 10)+1);
		
		var criteria = 5;
		
		if(y < 5 || y > (MapRows - 5))
			criteria = criteria + 2;
		if(x < 5 || x > (MapColumns - 5))
			criteria = criteria + 2;
		
		if(y < 10 || y > (MapRows - 10))
			criteria++;
		if(x < 10 || x > (MapColumns - 10))
			criteria++;
		
		//Center filled
		if(y < ((MapRows / 2)+10) && y > ((MapRows / 2)-10) && x < ((MapColumns / 2)+5) && x > ((MapColumns / 2)-5))
			criteria = criteria - 5;
		
		if(x > 1 && randomMap[x-1][y] == colorLand)
			criteria--;
		if(y > 1 && x > 1 && randomMap[x-1][y-1] == colorLand)
			criteria--;
		if(y > 1 && randomMap[x][y-1] == colorLand)
			criteria--;
		
		if(rand > criteria)
			randomMap[x][y] = colorLand;
		else
			randomMap[x][y] = colorWater;
	
	}
}

//The color of each hexagon



var color = ["#E9FF63", "#7DFF63", "#63F8FF", "#99FF63", "#CFFE63", "#FFC263", "#FFC763", "#FF8E63", "#FF6464", "#FF7563", "#FF6364", "#FF7F63", "#FFE963", "#E3FF63", "#FFD963", "#FFE263", "#BAFF63", "#6BFF63", "#64FF69", "#71FF63", "#63FF6C", "#63FFD8", "#64FF69", "#63FF9A", "#FDFC63", "#88FF63", "#66FF64", "#A6FF63", "#63FFDB", "#63D9FE", "#90FF63", "#FF9B63", "#FF7263", "#9DFF63", "#E5FF63", "#FF7F63", "#FF7463", "#FFAE63", "#F4FF63", "#FFEC63", "#FBFF63", "#FFE663", "#FFC263", "#9DFF63", "#AEFF63", "#6AFF63", "#65FF65", "#63FFC7", "#C5FF63", "#63FFBE", "#63FF93", "#63FFAC", "#62FF79", "#90FF63", "#6AFF63", "#63FFEF", "#63F7FF", "#63FFD1", "#6370FF", "#638DFF", "#63FFDF", "#C5FF63", "#63FF6A", "#64FF69", "#C7FE63", "#FDFC63", "#D0FE63", "#FFDC63", "#E3FF63", "#DCFF63", "#C9FE63", "#FBFF63", "#FFB663", "#D9FF63", "#9DFF63", "#69FF63", "#DCFF63", "#63FFD4", "#63FFB8", "#64FF67", "#74FF63", "#63FCFF", "#63FFF9", "#63FFE9", "#A6FF63", "#63FFCD", "#63CEFE", "#63FBFF", "#63FFFB", "#637CFF", "#6379FF", "#D2FE63", "#CFFE63", "#63FF6E", "#65FF65", "#EEFF63", "#DCFF63", "#9DFF63", "#AAFF63", "#B6FF63", "#D0FE63", "#AEFF63", "#CDFE63", "#64FF67", "#99FF63", "#66FF64", "#63FFC1", "#63FFD4", "#63FF90", "#63FFD1", "#63FFF4", "#63FFEC", "#63FFF9", "#71FF63", "#63FF93", "#63FFC4", "#63F7FF", "#638DFF", "#63E9FF", "#6375FF", "#88FF63", "#95FF63", "#63FFAF", "#63FF93", "#63FF9A", "#9DFF63", "#88FF63", "#EEFF63", "#BDFF63", "#71FF63", "#B6FF63", "#80FF63", "#62FF82", "#63FF6C", "#62FF76", "#63FF6E", "#63FFCD", "#63EFFF", "#63FFF6", "#63FFB5", "#63FFFC", "#63B4FF", "#63FFC1", "#63F5FF", "#63FFB5", "#63FFBB", "#63FFFC", "#6379FF", "#63B0FF", "#63FFBB", "#D5FE63", "#63FFB8", "#63FF6C", "#62FF7C", "#63FFBE", "#FFDF63", "#FFE263", "#FFE963", "#76FF63", "#67FF64", "#63FF90", "#65FF65", "#63FFA0", "#63FFA6", "#62FF73", "#63FFC1", "#63FFC4", "#63FFF9", "#63CEFE", "#63A4FF", "#6373FF", "#63C5FE", "#638DFF", "#63FF9D", "#6387FF", "#63FFBE", "#63FEFE", "#63FFEC", "#63FFF1", "#638DFF", "#FF6A64", "#FBFF63", "#FFEF63", "#63FFE9", "#62FF8C", "#BAFF63", "#FFAB63", "#FFCB63", "#62FF82", "#88FF63", "#63FFB2", "#63FFC1", "#63FFDF", "#63FFB5", "#63FFB5", "#62FF7F", "#63FFC4", "#63ECFF", "#63FFFC", "#63F3FF", "#63FFE5", "#63D2FE", "#63FFF6", "#63A8FF", "#63F8FF", "#63FFFB", "#63E4FF", "#636DFF", "#63FFC4", "#6387FF", "#FF8B63", "#EBFF63", "#C5FF63", "#BDFF63", "#62FF76", "#DCFF63", "#BDFF63", "#99FF63", "#62FF82", "#63FFA6", "#63C9FE", "#63FEFE", "#62FF89", "#63FFD8", "#63FFB8", "#63FFF1", "#63C1FE", "#63FCFF", "#63FFCA", "#63C9FE", "#63FFFC", "#6FFF63", "#63FFE5", "#63E9FF", "#63F7FF", "#63B0FF", "#636CFF", "#636CFF", "#63ACFF", "#63F1FF", "#FF8863", "#FF6864", "#FFB363", "#A2FF63", "#63FFD8", "#63FF96", "#99FF63", "#AEFF63", "#C7FE63", "#63FF93", "#63FFC1", "#63FFF9", "#63FFFB", "#67FF64", "#B2FF63", "#62FF76", "#62FF73", "#639CFF", "#63FFC1", "#63FFEF", "#66FF64", "#62FF76", "#63FFC4", "#63FFCA", "#63FFBE", "#63FFFC", "#6363FF", "#63ACFF", "#6375FF", "#63CEFE", "#FFB663", "#79FF63", "#BDFF63", "#63FF6C", "#66FF64", "#76FF63", "#FEF763", "#D7FE63", "#7DFF63", "#63FFB8", "#63F5FF", "#63F7FF", "#62FF7F", "#63FFA6", "#62FF76", "#63FFA6", "#63FFD1", "#63FEFE", "#63FFDF", "#63F8FF", "#63FF96", "#63FFA9", "#63FFA9", "#63C1FE", "#63FFC1", "#63D6FE", "#636EFF", "#6364FF", "#6370FF", "#6398FF", "#FFE663", "#C0FF63", "#EBFF63", "#C5FF63", "#D2FE63", "#69FF63", "#6FFF63", "#D4FE63", "#F4FF63", "#63FFC4", "#62FF89", "#63FFF4", "#63FFB8", "#63FFF4", "#63F8FF", "#62FF71", "#63FFBB", "#63FFEF", "#63FFF1", "#63FBFF", "#63C1FE", "#63FFDF", "#63FFD1", "#63FFE2", "#63ACFF", "#63F3FF", "#63DDFF", "#63FFF6", "#63D6FE", "#63CEFE", "#D4FE63", "#80FF63", "#FF8B63", "#D5FE63", "#63FFCA", "#90FF63", "#D7FE63", "#FBFF63", "#62FF7C", "#C9FE63", "#76FF63", "#69FF63", "#62FF7C", "#63FFD4", "#63FFA6", "#6BFF63", "#63FFC7", "#63E4FF", "#62FF7C", "#63FFF6", "#6379FF", "#63FFCD", "#63FFCA", "#63FFEF", "#63FFBE", "#63E9FF", "#63ECFF", "#63FFF9", "#63E0FF", "#63C5FE", "#FF6B63", "#FFD663", "#63FF6E", "#63FFB2", "#FFD663", "#62FF7F", "#63FFA6", "#9DFF63", "#F6FF63", "#95FF63", "#95FF63", "#FFD963", "#DCFF63", "#63FF90", "#63FFD1", "#63FFFC", "#63FFA3", "#63FFAF", "#63ECFF", "#63FFEF", "#63C5FE", "#63FDFF", "#63FF93", "#62FF76", "#69FF63", "#63EFFF", "#636DFF", "#6379FF", "#63E7FF", "#63E7FF", "#FF8E63", "#CDFE63", "#BDFF63", "#F9FF63", "#62FF7F", "#63FFE2", "#62FF86", "#67FF64", "#63FFA3", "#6DFF63", "#9DFF63", "#FFE963", "#FFBE63", "#6AFF63", "#62FF7F", "#63FFD4", "#79FF63", "#63D2FE", "#63DDFF", "#63FEFE", "#63BDFE", "#63FFDB", "#64FF69", "#62FF8C", "#63FFD8", "#63BDFE", "#63B8FF", "#6391FF", "#63FFDB", "#63FEFE", "#F8FF63", "#FFF263", "#C2FF63", "#FFDF63", "#D2FE63", "#64FF69", "#63FFE2", "#7DFF63", "#FDFC63", "#FF9763", "#6BFF63", "#F2FF63", "#FBFF63", "#AEFF63", "#80FF63", "#63D9FE", "#63FFBB", "#63FFD8", "#63FFEF", "#63C5FE", "#63FF90", "#62FF89", "#63D2FE", "#63FFC4", "#63FF93", "#63D2FE", "#63DDFF", "#63FDFF", "#6DFF63", "#62FF82", "#FF8363", "#DAFF63", "#74FF63", 
             "#63FF6A", "#63FF6A", "#64FF69", "#FFDF63", "#FF7F63", "#FFEF63", "#EEFF63", "#CFFE63", "#6AFF63", "#95FF63", "#63FF6C", "#63FF90", "#6BFF63", "#63FF90", "#63FFCA", "#63E9FF", "#63FFEC", "#63FFAC", "#63FFD4", "#63FAFF", "#63FFCA", "#63ECFF", "#62FF8C", "#63FFE5", "#69FF63", "#FF7463", "#FF9463", "#E0FF63", "#FFCB63", "#A6FF63", "#63FF93", "#E0FF63", "#FEFA63", "#EBFF63", "#AAFF63", "#C2FF63", "#D4FE63", "#63FFAC", "#65FF65", "#62FF73", "#63FFE9", "#65FF66", "#95FF63", "#62FF7F", "#63FFB5", "#63D2FE", "#63FFAC", "#63FFFB", "#62FF8C", "#64FF69", "#99FF63", "#63FFB2", "#63FFDF", "#63FFB8", "#BAFF63", "#FFDC63", "#62FF76", "#BDFF63", "#C2FF63", "#95FF63", "#F6FF63", "#FFA163", "#CFFE63", "#63FFE9", "#84FF63", "#6BFF63", "#6DFF63", "#63FFC1", "#D0FE63", "#69FF63", "#63FFC1", "#62FF8C", "#63FFBB", "#63FF96", "#63FAFF", "#63FFEC", "#63FEFE", "#62FF76", "#63FF9A", "#FFC563", "#6FFF63", "#63FFAF", "#63F5FF", "#63F1FF", "#63FF6A", "#62FF7C", "#63F8FF", "#9DFF63", "#99FF63", "#AEFF63", "#FF8363", "#FFC963", "#62FF79", "#63FF90", "#63FF6A", "#63FCFF", "#63E9FF", "#63FFA0", "#64FF67", "#FFD463", "#A6FF63", "#CBFE63", "#63FF90", "#63FFC4", "#63C9FE", "#63FFE5", "#63FFDB", "#62FF89", "#63FFD8", "#79FF63", "#63FF9A", "#63FAFF", "#63E9FF", "#63FF6E", "#63F7FF", "#63E4FF", "#63F5FF", "#64FF67", "#C9FE63", "#FFBA63", "#D9FF63", "#63FFD1", "#63FFF6", "#63FF93", "#C0FF63", "#F6FF63", "#62FF82", "#AEFF63", "#CBFE63", "#FF8363", "#63FF6A", "#63FFCD", "#63F7FF", "#63FFF9", "#63FFC4", "#63FFC4", "#95FF63", "#63FFCD", "#A2FF63", "#EBFF63", "#63FFC1", "#63FFA0", "#63E4FF", "#63FFFB", "#63F3FF", "#63CEFE", "#63FBFF"]

///////////////////////////////////////////////////////////////////////////
///////////////////////////// Mouseover functions /////////////////////////
///////////////////////////////////////////////////////////////////////////

 
//Function to call when you mouseover a node
function mover(d) {
	var el = d3.select(this);
		
		el.transition()
		.duration(10)		  
		.style("fill-opacity", 0.7)
		;
	
	el.attr("stroke", "black");

}

//Mouseout function
function mout(d) { 
	var el = d3.select(this)
	
	var x = el.attr("x"), y = el.attr("y");
	console.log(x + "  " + y);
	if(randomMap[x][y] == colorWater)
	{
		el.transition()
		.duration(1000)
		.style("fill-opacity", 0);
	}
	else
	{
		el.transition()
		.duration(1000)
		.style("fill-opacity", 1);
	}
};

function userZoomed() {
	map.scale =  d3.event.scale;
    map.svgContainer.attr("transform", "translate(" + d3.event.translate.join(",") + ") scale(" + map.scale + ")");
}

/*function windowResized() {
	map.svg.attr("width", 100).attr("height", 20);
}
window.onresize = windowResized;*/

var zoom = d3.behavior.zoom()
           .on('zoom', userZoomed,false)
           .on('zoomstart', function() {
               if (d3.event.sourceEvent.type != 'mousewheel') {
                   $('#map').css('pointer-events', 'none');
               }
            })
           .on('zoomend', function() {
               if (d3.event.sourceEvent != null) {
                   $('#map').css('pointer-events', 'all');
               }
            });

///////////////////////////////////////////////////////////////////////////
////////////// Initiate SVG and create hexagon centers ////////////////////
///////////////////////////////////////////////////////////////////////////

//svg sizes and margins
var margin = {
    top: 50,
    right: 0,
    bottom: 20,
    left: 20
};

var width = $(window).width() - margin.left - margin.right - 40;
var height = $(window).height() - margin.top - margin.bottom - 80;

	
//The maximum radius the hexagons can have to still fit the screen
map.hexRadius = d3.min([width/(Math.sqrt(3)*(MapColumns+3)),
			height/((MapRows+3)*1.5)]);
						
//Set the new height and width based on the max possible
width = MapColumns* map.hexRadius *Math.sqrt(3);
height = MapRows*1.5* map.hexRadius +0.5*map.hexRadius;

//Set the hexagon radius
var hexbin = d3.hexbin()
    .radius(map.hexRadius);

//Calculate the center positions of each hexagon	
var points = [];
var truePoints = [];
for (var i = 0; i < MapRows; i++) {
    for (var j = 0; j < MapColumns; j++) {
        points.push([map.hexRadius * j * 1.75, map.hexRadius * i * 1.5]);
	truePoints.push([map.hexRadius * j * Math.sqrt(3), map.hexRadius * i * 1.5]);
    }//for j
}//for i

//Create SVG element
map.svg = d3.select(map.element).append("svg")
    //.attr("width", width + margin.left + margin.right)
    //.attr("height", height + margin.top + margin.bottom)
	.attr("viewBox", "0 0 " + width + " " + height )
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.attr("pointer-events", "all")
	.call(zoom);

///////////////////////////////////////////////////////////////////////////
////////////////////// Draw hexagons and color them ///////////////////////
///////////////////////////////////////////////////////////////////////////

//Start drawing the hexagons
map.svg.append("g")
	.attr("id", "container")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", function (d) {
		return "M" + d.x + "," + d.y + hexbin.hexagon();
	})
    .attr("stroke", function(d,i){
		if(randomMap[d.i][d.j] == colorLand)
			return "white";
		else
			return "#7EC8ED";

	})
    .attr("stroke-width", "1px")
    .style("fill", function (d,i) {
		
		return randomMap[d.i][d.j];

	})
	.attr("fill", "url(http://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg)")

	.style("fill-opacity", function(d,i){
		if(randomMap[d.i][d.j] == colorWater)
			return "0.0";
		else
			return "1";
	})
	.style("stroke-opacity", function(d) {
		if(randomMap[d.i][d.j] == colorWater)
			return "0.1";
		else
			return "0.5";
	})
	.style("stroke-linejoin", "miter")
	.style("stroke-miterlimit", 10)
	.style("stroke-linecap", "square")
	.attr("x", function(d){
		return d.i	
	})
	.attr("y", function(d){
		return d.j
	})
	.attr("transform", "translate(-" + width/2 + ",-" + height/2 +") scale(2)")
	.on("mouseover", mover)
	.on("mouseout", mout);

map.svgContainer = map.svg.select("#container")
        .attr("pointer-events", "all");

/*
///////////////////////////////////////////////////////////////////////////
///// Function to calculate the line segments between two node numbers ////
///////////////////////////////////////////////////////////////////////////
//Which nodes are neighbours
var neighbour = 
[
	[577,548], [578,579], [578,548], [578,549],[583,584], [583,554], [592,593], [593,563], [540,510], [541,510], [541,511],[542,511], [547,548], [548,517], [553,554], [553,523], [562,532], [563,564], [563,532], [563,533], [511,512], [511,482], [517,518], [517,488], [521,492], [522,523], [522,492], [522,493], [531,532], [532,502], [481,482], [482,451], [487,488], [487,457], [491,492], [491,461], [501,471], [502,503], [502,471], [502,472], [451,452], [452,422], [456,457], [457,427], [460,461], [460,431], [470,471], [470,441], [422,423], [423,392], [427,428], [427,397], [430,431], [430,400], [431,400], [440,441], [440,410], [392,393], [392,363], [394,365], [395,365], [395,366], [396,397], [396,366], [396,367], [398,369], [399,400], [399,369], [399,370], [400,401], [401,371], [409,410], [409,380], [413,384], [414,384], [362,363], [362,332], [363,332], [363,333], [364,365], [364,333], [364,334], [368,369], [368,338], [371,372], [372,341], [379,380], [379,349], [383,384], [383,353], [384,385], [384,354], [331,332], [332,302], [337,338], [338,308], [341,342], [341,312], [348,349], [349,319], [351,322], [352,353], [352,322], [352,323], [353,354], [353,324], [302,303], [302,272], [308,309], [308,278], [311,312], [312,281], [312,282], [313,282], [314,284], [315,284], [318,288], [319,320], [319,288], [319,289], [321,322], [322,291], [323,324], [324,293], [324,294], [325,294], [271,272], [271,242], [277,278], [278,248], [282,283], [283,284], [283,253], [283,254], [284,285], [285,255], [287,288], [287,258], [291,292], [292,262], [294,295], [295,265], [295,266], [296,266], [296,267], [297,267], [298,269], [299,269], [240,210], [241,242], [241,210], [242,211], [248,249], [249,218], [255,256], [256,225], [256,226], [257,258], [257,226], [257,227], [262,263], [262,232], [267,268], [268,269], [268,237], [268,238], [210,211], [211,212], [211,181], [211,182], [217,188], [218,219], [218,188], [218,189], [225,226], [225,196], [231,232], [231,202], [181,182], [182,151], [187,188], [187,157], [195,196], [196,165], [201,202], [202,171], [151,152], [151,122], [152,122], [152,123],[153,123], [155,126], [156,157], [156,126], [156,127], [165,166], [166,136], [166,137], [167,137], [170,141], [171,172], [171,141], [171,142], [121,122], [121,91], [123,124], [124,93], [124,94], [125,126], [125,94], [125,95], [137,138], [138,107], [138,108], [139,108], [139,109], [140,141], [140,109], [140,110], [90,91], [91,61], [91,62], [92,62], [92,63], [93,63], [106,77], [107,108], [107,77], [107,78], [63,64], [64,33], [76,77], [77,46], [33,34], [33,4], [46,47], [46,17], [3,4], [16,17]
];

//Initiate some variables
var Sqr3 = 1/Math.sqrt(3);
var lineData = [];
var Node1,
	Node2,
	Node1_xy,
	Node2_xy,
	P1,
	P2;
				  
//Calculate the x1, y1, x2, y2 of each line segment between neighbours
for (var i = 0; i < neighbour.length; i++) {
	Node1 = neighbour[i][0];
	Node2 = neighbour[i][1];
	
	//An offset needs to be applied if the node is in an uneven row
 	if (Math.floor(Math.floor((Node1/MapColumns)%2)) != 0) {
		Node1_xy = [(truePoints[Node1][0]+(hexRadius/(Sqr3*2))),truePoints[Node1][1]];
	}
	else {
		Node1_xy = [truePoints[Node1][0],truePoints[Node1][1]];
	}
	
	//An offset needs to be applied if the node is in an uneven row
	if (Math.floor(Math.floor((Node2/MapColumns)%2)) != 0) {
		Node2_xy = [(truePoints[Node2][0]+(hexRadius/(Sqr3*2))),truePoints[Node2][1]];
	}
	else {
		Node2_xy = [truePoints[Node2][0],truePoints[Node2][1]];
	}//else
	
	//P2 is the exact center location between two nodes
	P2 = [(Node1_xy[0]+Node2_xy[0])/2,(Node1_xy[1]+Node2_xy[1])/2]; //[x2,y2]
	P1 = Node1_xy; //[x1,x2]
	
	//A line segment will be drawn between the following two coordinates
	lineData.push([(P2[0] + Sqr3*(P1[1] - P2[1])),(P2[1] + Sqr3*(P2[0] - P1[0]))]); //[x3_top, y3_top]
	lineData.push([(P2[0] + Sqr3*(P2[1] - P1[1])),(P2[1] + Sqr3*(P1[0] - P2[0]))]); //[x3_bottom, y3_bottom]
}//for i

///////////////////////////////////////////////////////////////////////////
/////////////////// Draw the black line segments //////////////////////////
///////////////////////////////////////////////////////////////////////////

var lineFunction = d3.svg.line()
		  .x(function(d) {return d[0];})
		  .y(function(d) {return d[1];})
		  .interpolate("linear");
				  
var Counter = 0;
//Loop over the linedata and draw each line
for (var i = 0; i < (lineData.length/2); i++) { 	
svg.append("path")
	.attr("d", lineFunction([lineData[Counter],lineData[Counter+1]]))
	.attr("stroke", "black")
	.attr("stroke-width", 1.25)
	.attr("fill", "none");
	
	Counter = Counter + 2;
} //for i
*/