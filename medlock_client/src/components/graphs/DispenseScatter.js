import React, { Component } from 'react';
import * as d3 from "d3";
import { dispenses } from './dummyData';

export default class DispenseScatter extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            svg: null,
            chart: null,
            config: null,
        }
    }

    canvasRef = React.createRef();

    addZero(val) {
        if (val < 10)
            return "0" + val;
        else
            return "" + val;
    }
    parseData(data) {

        return data.map(timestamp => {
            const date = new Date(timestamp)
            const x = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`
       
            const hours = date.getHours();
            const min = date.getMinutes();
            const sec = date.getSeconds();
            const y = hours*3600 + min*60 + sec;

            return [x,y]
        });
    }

    drawChart() {
        const data = this.parseData(dispenses); // replace dispenses with this.props.data
        console.log(data);
        const margin = 60;
        const canvasHeight = this.props.height - 2*margin;
        const canvasWidth = this.props.width - 2*margin;

        const canvas = d3.select(this.canvasRef.current);
        const svg = canvas.select("svg");
        
        const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`)

        const yScale = d3.scaleTime()
            .domain([0, 84000])
            .range([canvasHeight, 0])

        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(8)
            .tickSize(-canvasWidth, 0, 0)
            .tickFormat((d, i) => {
                const hours = Math.floor(d / 3600);
                return `${this.addZero(hours)}:00`
            });
            

        // chart.append('g')
        //     .call(d3.axisLeft(yScale))

        const xScale = d3.scaleBand()
            .range([0, canvasWidth])
            .domain(data.map(xy => xy[0]))
            .padding(0.2)

        chart.append('g')
            .attr('transform', `translate(0, ${canvasHeight})`)
            .call(d3.axisBottom(xScale))

         // create grid lines
         chart.append('g')
            .attr('class', 'grid')
            .call(yAxis)

        // y-axis label        
        svg.append('text')
            .attr('x', -(canvasHeight / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Time')
        

        // x-axis label
        svg.append('text')
            .attr('x', canvasWidth / 2 + margin)
            .attr('y', canvasHeight + margin * 1.7)
            .attr('text-anchor', 'middle')
            .text('Date')

        // title
        svg.append('text')
            .attr('id', 'title')
            .attr('x', canvasWidth / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Dispenses')
            
        var tooltip = d3.select(this.canvasRef.current)
            .append("div")
            .style("opacity", "0")
            .style("display", "none")

        chart.selectAll()
            .data(data).enter()
            .append("circle")
            .attr('cx', (d, i) => xScale(d[0]) + xScale.bandwidth()/2)
            .attr('cy', (d, i) => yScale(d[1]))
            .attr('r', 5)
            .attr('id', (d, i) => i)
            .attr('fill', 'var(--medlock-blue)')
            .on("mouseover", (d, i) => {
                this.setState({
                    config: {
                        mouseover: i
                    }
                })
            });
        
        console.log(chart)

        const config = {
            tooltip,
        }

        this.setState({ 
            svg, 
            chart,
            config,
        });
    }

    updateChart() {
        console.log("updating chart!");
        const { chart, config } = this.state;
        console.log(chart);
        chart.selectAll("circle")
            .on("mouseover", (d, i) => {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("r", 10);
            });
    }
    
    componentDidMount() {
        this.drawChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    render() {
        return (
            <div ref={this.canvasRef}>
                <svg height={this.props.height} width={this.props.width}></svg>
            </div>
        )
    }
}
