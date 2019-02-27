import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

class BarChartV3 extends React.Component {

    scaleColor = d3.scaleSequential(d3.interpolateViridis);
    scaleHeight = d3.scaleLinear();
    scaleWidth = d3.scaleBand().padding(0.1);

    componentDidMount() {
        this.updateChart();
        const { baseData: { begin_ts, end_ts }, height, animDuration } = this.props;
        const now = new Date((begin_ts*1000));
        const end = new Date((end_ts*1000));
        console.log(now, end);
        window.addEventListener("mousemove", this.handleMouseMove);
    }

    componentDidUpdate() {
        this.updateChart();
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove = e => {
        const elem = this.viz.getBoundingClientRect();
        const mouseX = e.clientX - elem.left;
        d3.select(this.viz)
            .selectAll('.cursor-line')
            .attr('x', mouseX);
    };

    updateChart() {
        this.updateScales();
        const { data, height, animDuration } = this.props;
        const bars = d3.select(this.viz)
            .selectAll('.bar')
            .data(data, function(d) { return d ? d.item : d3.select(this).attr('item'); });
        bars
            .transition().duration(animDuration)
            .attr('y', (d) => ( this.scaleHeight(d.count) ))
            .attr('height', (d) => (height - this.scaleHeight(d.count)) )
            .attr('x', (d) => ( this.scaleWidth(d.item) ) )
            .attr('width', this.scaleWidth.bandwidth() )
            .style('fill',  (d) => ( this.scaleColor(d.item) ));
    }

    updateScales() {
        const { data, width, height, padding } = this.props;
        this.scaleColor.domain([0, data.length]);
        this.scaleWidth
            .domain(data.map((d) => (d.item)))
            .range([padding, width - padding]);
        this.scaleHeight
            .domain(d3.extent(data, (d) => (d.count)))
            .range([height - padding, padding]);
    }

    render() {
        const { width, height, data } = this.props;
        const bars = data.map((d) => (
            <rect key={d.item}
                item={d.item}
                className="bar"
                y={height} rx="5" ry="5"
            />));
        return (
            <svg ref={ viz => (this.viz = viz) }
                // viewBox={`0 0 ${width} ${height}`}
                width={width} height={height}
            >
                { bars }
                <rect className="cursor-line" y={0} width={2} height={height} />
            </svg>
        );
    }
}

BarChartV3.defaultProps = {
    animDuration: 600
};

BarChartV3.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    animDuration: PropTypes.number
};

export default BarChartV3;
