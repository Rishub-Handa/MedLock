import React, { Component } from 'react';
import * as d3 from "d3";

export default class PDISurveyBar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            svg: null,
            chart: null,
            config: null,
            surveyIndex: props.data.length - 1,
        }
    }
    componentDidMount() {
        // important in React to ensure that the chart displays
        // only when the component has been mounted on the DOM
        this.drawChart();

    }

    onSelectChange = (e) => {
        this.setState({
            surveyIndex: e.target.value,
        });
    }

    surveySelect(dates) {
        return (
            <select onChange={this.onSelectChange}>
                {dates.map((date, i) => {
                        if (i == this.state.surveyIndex) 
                            return <option selected="selected" value={i}>{this.formatTimestamp(date)}</option>
                        return <option value={i}>{this.formatTimestamp(date)}</option>
                    })
                }
            </select>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.surveyIndex != prevState.surveyIndex) {
            this.updateChart();
        }
    }

    parseData() {
        const data = {
            x: this.props.data[this.state.surveyIndex].responses.map(pair => pair['question']),
            y: this.props.data[this.state.surveyIndex].responses.map(pair => Number(pair['answer'])),
        }
        return data;
    }

    drawChart() {
        const data = this.parseData();

        const margin = 60;
        const canvasHeight = this.props.height - 2*margin;
        const canvasWidth = this.props.width - 2*margin;

        const svg = d3.select(this.refs.canvas)
            .append("svg")
            .attr("height", this.props.height)
            .attr("width", this.props.width)
        
        const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`)

        const yScale = d3.scaleLinear()
            .range([canvasHeight, 0])
            .domain([0, 10])

        chart.append('g')
            .call(d3.axisLeft(yScale))

        const xScale = d3.scaleBand()
            .range([0, canvasWidth])
            .domain(data.x)
            .padding(0.2)

        chart.append('g')
            .attr('transform', `translate(0, ${canvasHeight})`)
            .call(d3.axisBottom(xScale))

        // create grid lines
        chart.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft()
                .scale(yScale)
                .tickSize(-canvasWidth, 0, 0)
                .tickFormat(''))

        // y-axis label        
        svg.append('text')
            .attr('x', -(canvasHeight / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Pain Disability Index')
        

        // x-axis label
        svg.append('text')
            .attr('x', canvasWidth / 2 + margin)
            .attr('y', canvasHeight + margin * 1.7)
            .attr('text-anchor', 'middle')
            .text('Categories')

        // title
        svg.append('text')
            .attr('id', 'title')
            .attr('x', canvasWidth / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(`PDI Survey Response for ${this.formatTimestamp(this.props.data[this.state.surveyIndex].date)}`)

        const config = {
            xScale,
            yScale,
            canvasHeight,
        }

        // plot data
        chart.selectAll()
            .data(data.y).enter()
            .append("rect")
            .attr('x', (d, i) => xScale(data.x[i]))
            .attr('y', (d, i) => yScale(d))
            .attr('height', (d, i) => canvasHeight - yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('fill', 'var(--medlock-blue)')

        this.setState({
            svg,
            chart, 
            config,
        });
    }

    updateChart = () => {
        const {svg, chart, config} = this.state;
        const data = this.parseData();

        chart.selectAll("rect")
            .data(data.y)
            .attr('y', (d, i) => config.yScale(d))
            .attr('height', (d, i) => config.canvasHeight - config.yScale(d))

        svg.select('#title')
            .text(`PDI Survey Response for ${this.formatTimestamp(this.props.data[this.state.surveyIndex].date)}`)
    }

    formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
    }

    render() {
        return (
            <div>
                <div ref="canvas"></div>
                <div>{this.surveySelect(this.props.data.map(survey => survey.date))}</div>
            </div>
            );
        }
    }