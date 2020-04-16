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
	//Each element will correspond to an app cell  in the phone
	data = [120, 12, 4, 45, 3, 4];
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


	flip()
	{
		this.empty();
		let parentDiv = document.getElementById(this.container).parentElement;
		parentDiv.classList.toggle("phoneFormat");
		parentDiv.classList.toggle("tabletFormat");
		//We flip the ratio of the phone as well
		this.ratio.reverse();
		this.rescale();
	}

	//Object passed as argument as this will not be useful in onClick responses
	update(phone)
	{

		//App icons
		let svg = d3.select('#'+this.container);
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
		.style('fill','grey')
		.on("mouseover", function (d, i) {
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
		})

		.on('click', function (){
			var active   = this.active ? false : true;
			var newColor = active ? "red" : "orange";
			// Hide or show the elements
			d3.select(this).style("fill", newColor);
			// Update whether or not the elements are active
			this.active = active;

			phone.flip();

			let contentDiv = document.getElementById("content");
			contentDiv.style.display = "inline-block";
			//contentDiv.innerHTML='<object type="text/html" data="app.html"></object>'
			contentDiv.innerHTML='<iframe class="frame" src="app.html"></iframe>'

			phone.rescaleContent();
	});


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
	const spaceBtwButtons = 3/2*this.margin;
	svg.append('circle')
	.attr('cx', this.offsetX + this.width/2)
	.attr('cy', this.offsetY + this.height-this.margin/2)
	.attr('r', this.size/8)
	.style('stroke', 'grey')
	.style('stroke-width', 2)
	.attr('class','highlight')





	const rectSize = 3*this.size/16;
	svg.append('rect')
	.attr('x', this.offsetX + this.width/2 + spaceBtwButtons - rectSize/2)
	.attr('y', this.offsetY + this.height - this.margin/2 - rectSize/2)
	.attr('width', rectSize)
	.attr('height', rectSize)
	.style('stroke', 'grey')
	.style('stroke-width', 2)
	.attr('class','highlight');


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
		.on('click', function(){ let contentDiv = document.getElementById("content");
		//Empty it
		contentDiv.innerHTML = '';
		//Make it invisible so that the void div does not block click
		contentDiv.style.display = "none";

		phone.flip();
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
