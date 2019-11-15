import React, { Component } from 'react'
import * as d3 from "d3";

export default class DateTimeScatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svg: null,
            chart: null,
            config: null,
            width: 0,
            height: 0,
        }
    }

    componentDidMount() {
        let width = this.getWidth();
        let height = this.getHeight();
        this.setState({width: width, height: height}, () => {
            this.drawChart();
        });

        let resizedFn;
        window.addEventListener("resize", () => {
            clearTimeout(resizedFn);
            resizedFn = setTimeout(() => {
                this.redrawChart();
            }, 200)
        });
    }


    getWidth() {
        return this.refs.canvas.parentElement.offsetWidth;
    }

    getHeight() {
        return this.refs.canvas.parentElement.offsetHeight;
    }

    addZero(val) {
        if (val < 10)
            return "0" + val;
        else
            return "" + val;
    }

    parseData(data) {
        return data.map(set => {
            return set.map(timestamp => {
                const date = new Date(timestamp);
                const x = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`       
                const hours = date.getHours();
                const min = date.getMinutes();
                const sec = date.getSeconds();
                const y = hours*3600 + min*60 + sec;
                return [x,y]
            });
        });
    }

    flattenData(data) {
        // should be called after parseData, add some check for that!
        var flatData = []
        data.forEach((set, i) => {
            set.forEach(xy => {
                flatData.push([xy[0],xy[1],i])
            });
        });
        return flatData;
    }

    tooltipMouseover = (d, tooltip) => {
        var html = `${this.formatTime(d)}`;

        tooltip.html(html)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .transition()
                .duration(300)
                .style("opacity", 1)
    }

    tooltipMouseout = (d, tooltip) => {
        tooltip.transition()
            .duration(300)
            .style("opacity", 0)
    }

    formatTime = (d) => {
        const hours = Math.floor(d / 3600);
        const minutes = Math.floor((d % 3600) / 60);
        return `${this.addZero(hours)}:${this.addZero(minutes)}`
    }

    drawChart() {
        console.log("called drawChart");
        var data = this.parseData(this.props.data); // replace dispenses with this.props.data
        data = this.flattenData(data);
        const margin = 60;
        const canvasHeight = this.state.height - 2*margin;
        const canvasWidth = this.state.width - 2*margin;

        const canvas = d3.select(this.refs.canvas);
        console.log(canvas);
        const svg = canvas.append("svg")
            .attr("id", this.props.id)
            .attr("height", this.state.height)
            .attr("width", this.state.width);


        
        const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`);

        const yScale = d3.scaleTime()
            .domain([0, 86400])
            .range([canvasHeight, 0])

        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(8)
            .tickSize(-canvasWidth, 0, 0)
            .tickValues([0, 10800, 21600, 32400, 43200, 54000, 64800, 75600, 86400])
            .tickFormat((d, i) => this.formatTime(d));

        var xDomain = data.map(d => d[0]).sort();
        const xScale = d3.scaleBand()
            .range([0, canvasWidth])
            .domain(xDomain)
            .padding(0.2);

        chart.append('g')
            .attr('transform', `translate(0, ${canvasHeight})`)
            .call(d3.axisBottom(xScale));

         // create grid lines
         chart.append('g')
            .attr('class', 'grid')
            .call(yAxis);

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
            .text(this.props.title)
            
        var tooltip = d3.select(this.refs.canvas).append("div")
            .attr("class", "tooltip")
            .style("opacity", "0")

        const ids = [];

        chart.selectAll()
            .data(data).enter()
            .append("circle")
            .attr('cx', (d, i) => xScale(d[0]) + xScale.bandwidth()/2)
            .attr('cy', (d, i) => yScale(d[1]))
            .attr('r', 5)
            .attr('id', (d, i) => `p${i}`)
            .attr('fill', (d, i) => this.props.colors[d[2]])
            .attr('opacity', 0.8)
            .on("mouseover", (d, i) => {
                this.setState({
                    config: {
                        mouseover: i
                    }
                })
            });
        
        const config = { tooltip };

        this.setState({ 
            svg, 
            chart,
            config,
        });
    }

    redrawChart = () => {
        console.log("called redrawChart");
        let width = this.getWidth();
        let height = this.getHeight();
        this.setState({width: width, height: height});
        d3.select(`#${this.props.id}`).remove();
        this.drawChart();
    }

    updateChart() {
        const { chart, config } = this.state;
        /**
         * since componentDidUpdate can be called before drawChart is called,
         * make sure that chart is defined before proceeding
         */
        if (chart) { 
            chart.selectAll("circle")
            .on("mouseover", (d, i) => {
                // increase the size of the point
                chart.select(`#p${i}`)
                    .transition()
                    .duration(500)
                    .attr("r", 10);
                
                // show tooltip
                this.tooltipMouseover(d[1], config.tooltip);
            })
            .on("mouseout", (d, i) => {
                // decrease the size of the point
                chart.select(`#p${i}`)
                    .transition()
                    .duration(500)
                    .attr("r", 5);
                
                // hide tooltip
                this.tooltipMouseout(d[1], config.tooltip);
            });
        }
    }
    
    componentDidUpdate() {
        console.log("called componentDidUpdate");
        this.updateChart();
    }

    render() {
        return (
            <div className={`graph-container ${this.props.id}`}>
                <div ref="canvas"></div>
            </div> 
        )
    }
}

