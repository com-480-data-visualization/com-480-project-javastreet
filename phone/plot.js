/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25, 16];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };

class ScatterPlot {
	constructor(svg_element_id, data) {
		this.data = data;
		this.svg = d3.select('#' + svg_element_id);

		console.log(this.svg);
		const x_range = [d3.min(data, d => d.x), d3.max(data, d => d.x)];
		const y_range = [0, d3.max(data, d => d.y)];

		const x_trans = d3.scaleLinear()
    .domain(x_range)
    .range([0, 200]);

		const y_trans = d3.scaleLinear()
		.domain(y_range)
		.range([100, 0]);

		this.svg.selectAll("circle")
		  .data(data)
		  .enter().append("circle")
		    .attr("cx", function(d) { return x_trans(d.x); })
		    .attr("cy", function(d) { return y_trans(d.y); })
		    .attr("r", 1.5)
				.style("fill", function(d) {
            if (d.y <= 17) {return "blue"}
            else if (d.y >= 23) { return "red" }
				;});

				// Create a label for each point
				this.svg.append('g')
					.selectAll('text')
					.data(data)
					.enter()
						.append('text')
						.text( d => d.name )
						.attr('x', d => x_trans(d.x))
						.attr('y', 105);

				// Create Y labels
				const label_ys = Array.from(Array(6), (elem, index) => 20 * index); // 0 20 40 ... 180
				this.svg.append('g')
					.selectAll('text')
					.data(label_ys)
					.enter()
						.append('text')
						.text( svg_y => y_trans.invert(svg_y).toFixed(1) )
						.attr('x', -5)
						.attr('y', svg_y => svg_y + 1);
		}
}

whenDocumentLoaded(() => {

	// prepare the data here
	var data = TEST_TEMPERATURES.map(function(temp, i) {
	  return {'y': temp, 'x': i, 'name': DAYS[i]};
	});

	console.log(data);

	const plot = new ScatterPlot('plot', data);
});
