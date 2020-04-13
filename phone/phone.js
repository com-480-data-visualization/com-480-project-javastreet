function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

whenDocumentLoaded(() => {
	//Each element will correspond to an app cell  in the phone
  data = [120, 12, 4, 45, 7, 9, 34, 56, 6, 84,2, 56, 6, 84, 11];
	const iphone = new Phone('monTel', data, 3, 60, 15);
});


class Phone {
	constructor(container, data, nbCol, size, margin)
	{
		this.container=container;
		this.data=data;
    this.width=size;
    this.height=size;
		this.margin = margin;
    this.nbCol=nbCol;
		this.update(size);
	}

	// Size passed as argument -> see explanation in mouseover function below
	update(size)
	{
		let svg = d3.select('#'+this.container);
		svg.selectAll('rect')
												.data(this.data)
												.enter()
												.append('rect')
												.attr('x', (d,i) => this.margin + (i%this.nbCol)*(this.width+this.margin))
												.attr('y', (d,i) => this.margin + Math.floor(i/this.nbCol)*(this.height+this.margin))
												.attr('rx', 15)
                        .attr('ry', 15)
                        .attr('width', this.width)
                        .attr('height', this.height)
												.style('fill','grey')
												.on("mouseover", function (d, i) {
													// if size isn't passed as argument "this.width" should
													// be used, but if we hover too quickly the transition
													// doesn't happen and the size doesn't change
													d3.select(this).transition()
																				.duration(200)
																				.attr('width', size * 1.2)
																				.attr('height', size * 1.2)
																				.style("fill", "orange");
												})

            						.on("mouseout", function (d, i) {
													d3.select(this).transition()
																				.duration(200)
																				.attr('width', size)
																				.attr('height', size)
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
												});


		svg.append('rect')
												.attr('x', 0)
												.attr('y', 0)
												.attr('rx', 15)
                        .attr('ry', 15)
                        .attr('width', this.margin+this.nbCol*(this.width+this.margin))
                        .attr('height', 4*this.margin+(Math.ceil(this.data.length/this.nbCol))*(this.height+this.margin))
												.style('stroke', 'grey')
												.style('stroke-width', 5)
												.style('fill','none');

		svg.append('circle')
												.attr('cx', (this.margin+this.nbCol*(this.width+this.margin)/2-this.width/8))
												.attr('cy', 2*this.margin+(Math.ceil(this.data.length/this.nbCol))*(this.height+this.margin))
                        .attr('r', this.width/4)
												.style('stroke', 'grey')
												.style('stroke-width', 2)
												.style('fill','none');


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
}
