function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

let iphone;
whenDocumentLoaded(() => {
	//Each element will correspond to an app cell in the phone
	data = [ {name:'Rankings', icon:'facebook.png', file:'app'},
	{name:'Repartition', icon:'whatsapp.png', file:'app_whats'},
	{}, {}, {}, {} ];

	iphone = new Phone('monTel', data, [14,9]);
	window.addEventListener("resize", windowUpdate);
});

function windowUpdate()
{
	console.log("YES");
	iphone.empty();
	iphone.rescale();
}


class Phone {
	constructor(container, data, ratio)
	{
		this.container=container;
		this.data=data;
		this.ratio = ratio;
		this.rescale();
	}

	rescale()
	{
		console.log("RESCALED");
		this.contWidth = document.getElementById(this.container).clientWidth;
		this.contHeight = document.getElementById(this.container).clientHeight;
		this.nbCol=Math.round(this.ratio[1]*Math.sqrt(data.length/(this.ratio[0]*this.ratio[1])));
		let sizeFromWidth = this.contWidth/((3*this.nbCol+1)/2);
		let sizeFromHeight = this.contHeight/((3*Math.ceil(data.length/this.nbCol)+1)/2);
		if(sizeFromWidth<sizeFromHeight)
		{
			this.size = sizeFromWidth;
			this.margin = this.size/2;
			this.width = this.contWidth;
			this.height = this.margin + Math.ceil(data.length/this.nbCol)*(this.size+this.margin);
		}
		else
		{
			this.size = sizeFromHeight;
			this.margin = this.size/2;
			this.height = this.contHeight;
			this.width = this.margin + this.nbCol*(this.size+this.margin);
		}
		this.offsetX = (this.contWidth-this.width)/2;
		this.offsetY = (this.contHeight-this.height)/2;
		this.webpage='';

		this.rescaleContent();

		this.update(this);
	}


	rescaleContent()
	{
		let padding = 3;
		let contentDiv = document.getElementById("content");
		contentDiv.style.width = this.width-2*padding+"px";
		contentDiv.style.height = this.height-this.margin-padding+"px";
		contentDiv.style.marginLeft = this.offsetX+padding+"px";
		contentDiv.style.marginTop = this.offsetY+padding+"px";
	}


	flipToPhone()
	{
		let parentDiv = document.getElementById(this.container).parentElement;
		if(parentDiv.classList.contains("tabletFormat"))
		{
			this.empty();
			parentDiv.classList.remove("tabletFormat");
			parentDiv.classList.add("phoneFormat");
			//We flip the ratio of the phone as well
			this.ratio.reverse();
			this.rescale();
		}
	}

	flipToTablet()
	{
		let parentDiv = document.getElementById(this.container).parentElement;
		if(parentDiv.classList.contains("phoneFormat"))
		{
			this.empty();
			parentDiv.classList.remove("phoneFormat");
			parentDiv.classList.add("tabletFormat");
			//We flip the ratio of the phone as well
			this.ratio.reverse();
			this.rescale();
		}
	}

	/*flip()
	{
	this.empty();
	let parentDiv = document.getElementById(this.container).parentElement;
	parentDiv.classList.toggle("phoneFormat");
	parentDiv.classList.toggle("tabletFormat");
	//We flip the ratio of the phone as well
	this.ratio.reverse();
	this.rescale();
}*/

//Object passed as argument as this will not be useful in onClick responses
update(phone)
{

	//App icons
	let svg = d3.select('#'+this.container);

	//Appends app icon when new app enters
	function appendIcon(phone, icon)
	{
		if(icon)
		{
			svg.append("defs")
			.append("pattern")
			.attr("width", 1)
			.attr("height", 1)
			.attr("id", 'icon_'+icon)
			.append("image")
			.attr("width", phone.size)
			.attr("height", phone.size)
			.attr("xlink:href", 'img/'+icon);
			return 'url(#icon_'+icon+')';
		}
		//If no icon file given, we fill in grey
		return 'grey';
	}

	//App rectangle
	svg.selectAll('rect')
	.data(this.data)
	.enter()
	.append('rect')
	.attr('x', (d,i) => this.offsetX + this.margin + (i%this.nbCol)*(this.size+this.margin))
	.attr('y', (d,i) => this.offsetY + this.margin/2 + Math.floor(i/this.nbCol)*(this.size+this.margin))
	.attr('rx', 15)
	.attr('ry', 15)
	.attr('width', this.size)
	.attr('height', this.size)
	.attr("fill", (d) => appendIcon(phone, d.icon))
	.attr('class','borderHighlight')



	/*.on("mouseover", function (d, i) {
	// if size isn't passed as argument "this.width" should
	// be used, but if we hover too quickly the transition
	// doesn't happen and the size doesn't change
	d3.select(this).transition()
	.duration(200)
	//.attr('width', phone.size * 1.2)
	//.attr('height', phone.size * 1.2)
	.style("fill", "orange");
})

.on("mouseout", function (d, i) {
d3.select(this).transition()
.duration(200)
.attr('width', phone.size)
.attr('height', phone.size)
.style("fill", "gray");
this.active = false;
})*/

.on('click', function (d){
	/*var active   = this.active ? false : true;
	var newColor = active ? "red" : "orange";
	// Hide or show the elements
	d3.select(this).style("fill", newColor);
	// Update whether or not the elements are active
	this.active = active;*/
	if(d.file){
		phone.flipToTablet();
		phone.page = d.file;
		let contentDiv = document.getElementById("content");
		contentDiv.style.display = "inline-block";
		//contentDiv.innerHTML='<object type="text/html" data="app.html"></object>'
		contentDiv.innerHTML='<iframe class="frame" src="'+phone.page+'.html"></iframe>'
		phone.rescaleContent();
	}
});

//Text under
svg.selectAll('text')
.data(this.data)
.enter()
.append('text')
.attr('x', (d,i) => this.offsetX + this.margin + (i%this.nbCol)*(this.size+this.margin)
+ this.size/5)
.attr('y', (d,i) => this.offsetY + this.margin/2 + Math.floor(i/this.nbCol)*(this.size+this.margin) +
this.size + this.margin/3)
.text((d,i) => d.name)



//Border of phone
svg.append('rect')
.attr('x', this.offsetX)
.attr('y', this.offsetY)
.attr('rx', 15)
.attr('ry', 15)
.attr('width', this.width)
.attr('height', this.height)
.style('stroke', 'grey')
.style('stroke-width', 5)
.style('fill','none');

//Buttons

//Circle button
const spaceBtwButtons = 3/2*this.margin;
svg.append('circle')
.attr('cx', this.offsetX + this.width/2)
.attr('cy', this.offsetY + this.height-this.margin/2)
.attr('r', this.size/8)
.style('stroke', 'grey')
.style('stroke-width', 2)
.attr('class','highlight')
.on('click', function(){ let contentDiv = document.getElementById("content");
//Empty webpage div display
contentDiv.innerHTML = '';
//Make it invisible so that the emptied div does not block click
contentDiv.style.display = "none";
phone.flipToPhone();
});

//Rectangle button
const rectSize = 3*this.size/16;
svg.append('rect')
.attr('x', this.offsetX + this.width/2 + spaceBtwButtons - rectSize/2)
.attr('y', this.offsetY + this.height - this.margin/2 - rectSize/2)
.attr('width', rectSize)
.attr('height', rectSize)
.style('stroke', 'grey')
.style('stroke-width', 2)
.attr('class','highlight');

// Triangle button
const lineGenerator = d3.line()
.x(d => d.x)
.y(d => d.y);

const triWidth =  3*this.size/16;
const triHeight = this.size/4;
const triStart = [this.offsetX + this.width/2 - spaceBtwButtons + triWidth/2,
	this.offsetY + this.height - this.margin/2 - triHeight/2];
	const triData = [ {"x": triStart[0], "y": triStart[1]},
	{"x": triStart[0], "y": triStart[1]+triHeight},
	{"x": triStart[0]-triWidth, "y": triStart[1]+triHeight/2},
	{"x": triStart[0], "y": triStart[1]}];
	svg.append("path")
	.attr("d", lineGenerator(triData))
	.style('stroke', 'grey')
	.attr("stroke-width", 2)
	.attr('class','highlight')
	.on('click', function (){
		let contentDiv = document.getElementById("content");
		contentDiv.innerHTML='<iframe class="frame" src="'+phone.page+'.html"></iframe>'
		phone.rescaleContent();
	});


	/*function highlight(d, i)
	{
	d3.select(this).style("fill", "orange");
}

function dehighlight(d, i) {
d3.select(this).style("fill", "none")
}*/

/*function handleMouseOver(d, i) {  // Add interactivity
// Use D3 to select element, change color and size

d3.select(this).style("fill", "orange");
d3.select(this).attr("width", this.width);
}

function handleMouseOut(d, i) {
// Use D3 to select element, change color back to normal
d3.select(this).style("fill", "gray");
}*/
}
empty()
{
	let svg = d3.select('#'+this.container);
	svg.selectAll("*").remove();
}
}
