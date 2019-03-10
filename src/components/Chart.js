import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Chart extends React.Component {

    scaleColor = d3.scaleSequential(d3.interpolateViridis);
    scaleHeight = d3.scaleLinear();
    scaleWidth = d3.scaleBand().padding(0.1);

    componentDidMount() {
        this.updateChart();
        const { data, height, animDuration } = this.props;
        // const now = new Date((begin_ts*1000));
        // const end = new Date((end_ts*1000));
        console.log(data);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentDidUpdate() {
        this.updateChart();
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = e => {
        const elem = this.viz.getBoundingClientRect();
        const mouseX = e.clientX - elem.left;
        d3.select(this.viz)
            .selectAll('.cursor-line')
            .attr('x', mouseX);
    };

    updateChart() {
        console.log('updateChart');
        this.updateScales();
        const { animDuration, data: { components }, filteredIds, height, width } = this.props;
        const filteredComponents = components
            .filter(component => !filteredIds.includes(component.subsystem_id));
        console.log('filteredComponents', filteredComponents);

        /*        d3.select(this.viz)
            .selectAll('.line')
            .data(filteredComponents);*/

        const line = d3.select(this.viz)
            .selectAll('.line')
            .data(filteredComponents);

        line
            .exit().remove(); //remove unneeded lines

        line
            .enter()
            .append('rect')
            // .transition().duration(animDuration)
            .attr('y', (d, i) => ( this.scaleHeight(i) ))
            .attr('height', 3 )
            .attr('x', 250 )
            .attr('width', width - 290 )
            .style('fill',  '#35b485')
            .attr('class', 'line');




        const groupEnter = d3.select(this.viz)
            .selectAll('.group')
            .data(filteredComponents)
            .enter()
            .append('g')
            .attr('class', 'group')
            .attr('transform', (d, i) =>`translate(40, ${this.scaleHeight(i)})`)
            .call(d3.drag()
                .on('start', this.dragStarted)
                .on('drag', this.dragged)
                .on('end', this.dragEnded)
            );


        // d3.select(this.viz)
        //     .selectAll('.label')
        //       .data(components)
        //       .enter()
        // .append("g")
        //   .transition().duration(animDuration)
        //   .attr('class', 'label-group')
        groupEnter
            .append('text')
            .text(d => d.title)
            .attr('class', 'label');
            // .attr('x', (d) => ( this.scaleWidth(d.title) ) )
            // .attr('y', (d, i) => ( this.scaleHeight(i) ));

        // .append("text")
        //   .text(d => d.title)
        //   .attr('class', 'label')
        // .attr('height', (d) => (height - this.scaleHeight(d.count)) )


        // .attr('width', this.scaleWidth.bandwidth() )
        // .style('fill',  (d) => ( this.scaleColor(d.item) ))


        // const bbox = d3.select(this.viz).selectAll('.label').node().getBBox();
        // console.log('bbox', bbox);
        // const padding = 2;
        // d3.select(this.viz).insert("rect", "text")
        //     .attr("x", bbox.x - padding)
        //     .attr("y", bbox.y - padding)
        //     .attr("width", bbox.width + (padding*2))
        //     .attr("height", bbox.height + (padding*2))
        //     .style("fill", "red")
        //     .call(d3.drag()
        //         .on("start", this.dragStarted)
        //         .on("drag", this.dragged)
        //         .on("end", this.dragEnded)
        //     );

    }

    updateScales() {
        const { data: { components }, width, height, padding } = this.props;
        this.scaleColor.domain([0, components.length]);
        this.scaleWidth
            .domain(components.map((d) => (d.title)))
            .range([padding, width - padding]);
        this.scaleHeight
            .domain(d3.extent(components, (d, i) => i))
            .range([height - padding, padding]);
    }

    dragStarted() {
        d3.select(this).classed('active', true);
    }

    dragged(d) {
        // console.log(d3.select(this).select('.label'));
        // console.log(d);
        // d.fy = d3.event.y;
        d3.select(this)
            // .attr('y', d3.event.y );
            .attr('transform', `translate(40, ${d3.event.y})`);
    }

    dragEnded(){
        d3.select(this).classed('active', false);
    }

    render() {
        const { width, height } = this.props;
        // const bars = components.map((d,i) => (
        //     <rect
        //         key={d.title}
        //         className="bar"
        //         x={0}
        //         y={10 * i}
        //         height={2}
        //         width={width}
        //     />));
        // const labels = components.map((d,i) => (
        //     <text
        //         key={d.title}
        //         className="label"
        //         x={0}
        //         y={10 * i}
        //         height={2}
        //         width={width}
        //     />));
        return (
            <svg ref={ viz => (this.viz = viz) }
                // viewBox={`0 0 ${width} ${height}`}
                width={width} height={height}
            >
                {/*{ bars }*/}
                {/*{ labels }*/}
                <rect className="cursor-line" y={0} width={2} height={height} />
            </svg>
        );
    }
}

Chart.defaultProps = {
    animDuration: 600
};

Chart.propTypes = {
    data: PropTypes.array.isRequired,
    baseData: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    animDuration: PropTypes.number
};

export default Chart;
