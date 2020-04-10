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
		this.update();
	}
	update()
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
												.style('fill','grey');
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
	}
}
