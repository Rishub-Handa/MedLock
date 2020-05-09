import React, { Component } from 'react'
import * as d3 from "d3";
import '../../App.css';

export default class DateTimeScatter extends Component {

    constructor(props) {
        super(props);

        var formattedData = this.reformatData(this.props.data);
        var dateRange = this.getDateRange(formattedData);
        this.state = {
            svg: null,
            chart: null,
            config: null,
            width: 800,
            height: 300,
            // index of the start date
            startDate: 0,
            // index of the end date
            endDate: dateRange.length - 1,
            data: formattedData,
            selectedEvents: {
                dispenses: true,
                btn1: false,
                btn2: false,
                btn3: false,
            },
            selectedDates: dateRange,
            selectedData: formattedData,
            dateRange: dateRange,
        }
        this.global = {
            pointRadius: 5,
            expandedPointRadius: 10,
        }
    }

    componentDidMount() {
        console.log("componentDidMount() called");

        // var data = this.parseData(this.props.data); // replace dispenses with this.props.data
        console.log(this.state.data);
        var size = this.getSize();

        this.setState({ width: size.width, height: size.height }, () => {
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

    getSize() {
        const minWidth = 500;
        const maxWidth = 1000;
        const minHeight = 200;
        const maxHeight = 400;
        var curWidth = this.state.width;
        var curHeight = this.state.height;
        let newWidth = this.getWidth();
        let newHeight = this.getHeight();
        var width;
        var height;

        if (newWidth > minWidth && newWidth < maxWidth) {
            width = newWidth;
        } else {
            width = curWidth;
        }

        if (newHeight > minHeight && newHeight < maxHeight) {
            height = newHeight;
        } else {
            height = curHeight;
        }

        var size = {
            width,
            height
        };

        return size;
    }

    addZero(val) {
        if (val < 10)
            return "0" + val;
        else
            return "" + val;
    }

    sameDate(a, b) {
        if (a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getYear() == b.getYear()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param {array} events 
     */
    getDateRange(events) {
        var dateRange = [];
        var timestamps = events.map(event => event[0]);

        if (timestamps.length < 2) {
            return [new Date(timestamps[0])];
        }

        var firstDate = new Date(timestamps[0]);
        var lastDate = new Date(timestamps[timestamps.length - 1]);

        if (this.sameDate(firstDate, lastDate)) {
            return [firstDate];
        }

        var curDate = new Date(firstDate.getTime());
        while (!this.sameDate(curDate, lastDate)) {
            var newDate = new Date(curDate.getTime());
            newDate.setHours(0, 0, 0, 0);
            dateRange.push(newDate);
            curDate = new Date(curDate.getTime() + (24 * 60 * 60 * 1000));
        }
        lastDate.setHours(0, 0, 0, 0);
        dateRange.push(lastDate);
        return dateRange;
    }

    increaseByOneDay = (date) => {
        var newDate = new Date(date.getTime() + (24 * 60 * 60 + 1000));
        return newDate;
    }

    reformatData(data) {
        var newData = data.map((set, i) => {
            return set.map(timestamp => {
                const date = new Date(timestamp);
                const x = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                const hours = date.getHours();
                const min = date.getMinutes();
                const sec = date.getSeconds();
                const y = hours * 3600 + min * 60 + sec;
                return [timestamp, x, y]
            });
        });
        var formattedData = this.flattenData(newData).sort((a, b) => (new Date(a[0])).getTime() - (new Date(b[0])).getTime());
        return formattedData;
    }

    flattenData(data) {
        // should be called after parseData, add some check for that!
        var flatData = []
        data.forEach((set, i) => {
            set.forEach(event => {
                flatData.push([event[0], event[1], event[2], i]);
            });
        });
        return flatData;
    }

    tooltipMouseover = (d, tooltip) => {
        var html = `${this.formatTime(d)}`;

        tooltip.html(html)
            .style("left", (d3.event.pageX - 17) + "px")
            .style("top", (d3.event.pageY - 11) + "px")
            .style("padding", "2px")
            .style("margin", "0px")
            .transition()
            .duration(300)
            .style("opacity", 0.7)
    }

    tooltipMouseout = (d, tooltip) => {
        tooltip.transition()
            .delay(2000)
            .duration(300)
            .style("opacity", 0)
    }

    formatDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    formatTime = (d) => {
        const hours = Math.floor(d / 3600);
        const minutes = Math.floor((d % 3600) / 60);
        return `${this.addZero(hours)}:${this.addZero(minutes)}`
    }

    drawChart() {
        console.log("drawChart() called");
        var data = this.getSelectedData();
        const margin = 60;
        const canvasHeight = this.state.height - 2 * margin;
        const canvasWidth = this.state.width - 2 * margin;

        const canvas = d3.select(this.refs.canvas);
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
            .tickFormat((d, i) => this.formatTime(d))

        var dates = data.map(d => d[1]).sort();
        this.getDateRange(dates);
        var selectedDates = this.state.dateRange.slice(this.state.startDate, this.state.endDate + 1);
        var xDomain = selectedDates.map(date => this.formatTimestamp(date));
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
            .call(yAxis)

        console.log(chart.select("line"));



        // y-axis label        
        svg.append('text')
            .attr('x', -(canvasHeight / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Time')
            .style('font-weight', '600')
            .style('fill', 'var(--medlock-dark-gray)')
            .style('stroke-width', '0')

        // x-axis label
        svg.append('text')
            .attr('x', canvasWidth / 2 + margin)
            .attr('y', canvasHeight + margin * 1.7)
            .attr('text-anchor', 'middle')
            .text('Date')
            .style('font-weight', '600')
            .style('fill', 'var(--medlock-dark-gray)')

        // title
        svg.append('text')
            .attr('id', 'title')
            .attr('x', canvasWidth / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(this.props.title)
            .style('font-family', 'Montserrat')
            .style('font-weight', 'bold')
            .style('fill', 'var(--medlock-dark-gray)')

        var tooltip = d3.select(this.refs.canvas).append("div")
            .attr("class", "tooltip")
            .style("opacity", "0")

        const ids = [];

        // var combinedPoints = this.combineClosePoints(data);
        // console.log("post");
        // var newData = combinedPoints[0];
        // var rScale = combinedPoints[1];
        chart.selectAll()
            .data(data).enter()
            .append("circle")
            .attr('cx', (d, i) => xScale(d[1]) + xScale.bandwidth() / 2)
            .attr('cy', (d, i) => yScale(d[2]))
            .attr('r', this.global.pointRadius)
            .attr('id', (d, i) => `p${i}`)
            .attr('fill', (d, i) => this.props.colors[d[3]])
            .attr('opacity', 0.5)
            .on("mouseover", (d, i) => {
                this.setState({
                    config: {
                        mouseover: i
                    }
                })
            });

        const config = { xScale, yScale, tooltip };

        this.setState({
            svg,
            chart,
            config,
        });
    }

<<<<<<< HEAD
    /**
     * method to combine points and increase radius if they're within a certain
     * distance of one another, not working atm
     */
    // combineClosePoints = (data) => {
    //     data = JSON.parse(JSON.stringify(data));
    //     console.log('combining on data:');
    //     console.log(data);
    //     // assume they all have the same date for now and are sorted in ascending order according to seconds
    //     // loop over each data point
    //     var i = 0; 
    //     var newData = [];
    //     var rScale = [];
    //     while (i < data.length) {
    //         console.log(i);
    //         var r = 1;
    //         var j = i+1;
    //         var newPoint = data[i];
    //         if (i == data.length - 1) {
    //             newData.push(newPoint);
    //             rScale.push(1);
    //             return [newData, rScale];
    //         }
    //         while (j < data.length) {
    //             var day_i = newPoint[0];
    //             var day_j = data[j][0];
    //             var time_i = newPoint[1];
    //             var time_j = data[j][1];
    //             if (day_i == day_j) {
    //                 console.log("true");
    //             } else {
    //                 console.log("false");
    //             }

    //             if (day_i == day_j && (time_j - time_i <= 60)) {
    //                 var avgTime = (time_i + time_j) / 2;
    //                 newPoint[1] = avgTime;
    //                 j += 1;
    //                 r += 1;
    //             } else {
    //                 newData.push(newPoint);
    //                 rScale.push(r);
    //                 i = j; // skip over the points that were included in the superpoint
    //                 j = data.length; //break inner loop;
    //             }
    //         }
    //         console.log(newData);
    //     }
    // }

=======
>>>>>>> master
    redrawChart = () => {
        console.log("redrawChart() called");
        var size = this.getSize();
        this.setState({ width: size.width, height: size.height });
        d3.select(`#${this.props.id}`).remove();
        this.drawChart();
    }

    updateChart() {
        console.log("updateChart() called");
        const { chart, config } = this.state;
        /**
         * since componentDidUpdate can be called before drawChart is called,
         * make sure that chart is defined before proceeding
         */
        if (chart) {
            const { xScale, yScale } = config;

            var getSign = () => {
                var val = Math.random() - 0.5;
                return val / Math.abs(val);
            }

            chart.selectAll("circle")
<<<<<<< HEAD
                .on("mouseover", (d, i) => {
                    console.log(`d: ${d}`);
                    console.log(`i: ${i}`);
                    // increase the size of the point
                    var dx = getSign() * Math.floor((Math.random() * 20) + 15);
                    var dy = getSign() * Math.floor((Math.random() * 20) + 15);
                    chart.select(`#p${i}`)
                        .transition()
                        .duration(1000)
                        .attr('cx', (d, i) => (xScale(d[1]) + xScale.bandwidth() / 2 + dx))
                        .attr('cy', (d, i) => (yScale(d[2]) + dy))
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr('cx', (d, i) => xScale(d[1]) + xScale.bandwidth() / 2)
=======
            .on("mouseover", (d, i) => {
                console.log(`d: ${d}`);
                console.log(`i: ${i}`);
                // increase the size of the point
                // randomly compute theta in [0, 2pi]
                var theta = Math.random() * (2 * Math.PI);
                // let r = 30
                var r = 30;
                // dx = rcos(0)
                var dx = r * Math.cos(theta);
                // dy = rsin(0)
                var dy = r * Math.sin(theta);
                // var dx = getSign() * Math.floor((Math.random() * 20) + 15);
                // var dy = getSign() * Math.floor((Math.random() * 20) + 15);
                chart.select(`#p${i}`)
                    .transition()
                        .duration(500)
                        .attr('cx', (d, i) => (xScale(d[1]) + xScale.bandwidth()/2 + dx))
                        .attr('cy', (d, i) => (yScale(d[2]) + dy))
                    .transition()
                        .delay(3000)
                        .duration(500)
                        .attr('cx', (d, i) => xScale(d[1]) + xScale.bandwidth()/2)
>>>>>>> master
                        .attr('cy', (d, i) => yScale(d[2]))
                    // .attr("r", this.global.expandedPointRadius);

                    // show tooltip
                    this.tooltipMouseover(d[2], config.tooltip);
                })
                .on("mouseout", (d, i) => {
                    // decrease the size of the point
                    // chart.select(`#p${i}`)
                    //     .transition()
                    //     .duration(1000)
                    //     .attr('cx', (d, i) => xScale(d[1]) + xScale.bandwidth()/2)
                    //     .attr('cy', (d, i) => yScale(d[2]))

                    // hide tooltip
                    this.tooltipMouseout(d[1], config.tooltip);
                });
        }
    }

    componentDidUpdate() {
        console.log("componentDidUpate() called");
        this.updateChart();
    }

    render() {
        return (
            <div className={`graph-container ${this.props.id}`}>
                <div className="canvas" ref="canvas"></div>
                <div className="graph-settings datetime" width={this.state.width} height={this.state.height}>
                    <div>{this.dataSelectorHTML()}</div>
                    <div>
                        <div>Start Date: {this.startDateSelect(this.state.dateRange)}</div>
                        <div>End Date: {this.endDateSelect(this.state.dateRange)}</div>
                    </div>
                </div>
            </div>
        )
    }

    formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return this.formatDate(date);
    }

    onStartDateSelectChange = (e) => {
        this.setState({
            startDate: Number(e.target.value),
        }, () => {
            this.redrawChart();
        });
    }

    onEndDateSelectChange = (e) => {
        this.setState({
            endDate: Number(e.target.value),
        }, () => {
            this.redrawChart();
        });
    }

    dataSelectorHTML = () => {
        return (
<<<<<<< HEAD
            <form style={{ padding: "15px", paddingLeft: "0px", marginTop: "100px" }}>
                <label>
                    <input
                        type="checkbox"
                        name="dispenses"
                        checked={this.state.selectedEvents.dispenses}
                        value={this.state.selectedEvents.dispenses}
                        onChange={this.onDataSelectorChange} />
                    Dispenses
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="btn1"
                        value={this.state.selectedEvents.btn1}
                        onChange={this.onDataSelectorChange} />
                    Button 1
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="btn2"
                        value={this.state.selectedEvents.btn2}
                        onChange={this.onDataSelectorChange} />
                    Button 2
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="btn3"
                        value={this.state.selectedEvents.btn3}
                        onChange={this.onDataSelectorChange} />
                    Button 3
                </label>
=======
            <form>
                <div class="group">
                    <label>
                        <input 
                            type="checkbox" 
                            name="dispenses" 
                            checked={this.state.selectedEvents.dispenses}
                            value={this.state.selectedEvents.dispenses} 
                            onChange={this.onDataSelectorChange} /> 
                        Dispenses
                    </label>
                    <div className="circle-legend dispenses"></div>
                </div>
                <div class="group">
                    <label>
                        <input 
                            type="checkbox" 
                            name="btn1"
                            value={this.state.selectedEvents.btn1} 
                            onChange={this.onDataSelectorChange} />
                        Button 1
                    </label>
                    <div className="circle-legend btn1"></div>
                </div>
                <div class="group"> 
                    <label>
                        <input 
                            type="checkbox" 
                            name="btn2" 
                            value={this.state.selectedEvents.btn2}
                            onChange={this.onDataSelectorChange} />
                        Button 2
                    </label>
                    <div className="circle-legend btn2"></div>
                </div>
                <div class="group">
                    <label>
                        <input 
                            type="checkbox" 
                            name="btn3" 
                            value={this.state.selectedEvents.btn3} 
                            onChange={this.onDataSelectorChange} />
                        Button 3
                    </label>
                    <div className="circle-legend btn3"></div>
                </div>
>>>>>>> master
            </form>
        )
    }

    onDataSelectorChange = (e) => {
        // some clicks not registering bc the sidebar div is overlayed
        console.log("onDataSelectorChange() called");
        var val = this.strToBool(e.target.value);
        var new_val = !val;
        this.setState({
            selectedEvents: {
                ...this.state.selectedEvents,
                [e.target.name]: new_val,
            }
        }, () => {
            this.redrawChart();
        });
    }

    getSelectedData = () => {
        var data = this.getDataInDateRange();
        data = this.getSelectedEvents(data);
        return data;
    }

    getDataInDateRange = () => {
        var firstDate = this.state.dateRange[this.state.startDate];
        var lastDate = this.state.dateRange[this.state.endDate];
        var lastDatePlusOne = new Date(lastDate.getTime() + (24 * 60 * 60 * 1000));
        var selectedDates = this.state.data.filter(event => {
            var date = new Date(event[0]);
            if (date.getTime() >= firstDate.getTime() && date.getTime() < lastDatePlusOne.getTime()) {
                return true;
            } else {
                return false;
            }
        });
        return selectedDates;
    }

    getSelectedEvents = (data) => {
        var selections = this.getDataSelections();
        return data.filter((event, i) => selections.indexOf(event[3]) > -1);
    }

    getDataSelections = () => {
        var selections = [];
        const { selectedEvents } = this.state;

        if (selectedEvents.dispenses) {
            selections.push(0);
        }

        if (selectedEvents.btn1) {
            selections.push(1);
        }

        if (selectedEvents.btn2) {
            selections.push(2)
        }

        if (selectedEvents.btn3) {
            selections.push(3)
        }

        return selections;
    }

    strToBool = (str) => {
        var bool = (str == 'true');
        return bool;
    }

    startDateSelect = (events) => {
        return (
            <select onChange={this.onStartDateSelectChange}>
                {
                    events.map((event, i) => {
                        if (i == this.state.startDate) {
                            return <option selected="selected" value={i}>{this.formatTimestamp(event)}</option>
                        } else {
                            return <option value={i}>{this.formatTimestamp(event)}</option>
                        }
                    })
                }
            </select>
        );
    }

    endDateSelect = (events) => {
        return (
            <select onChange={this.onEndDateSelectChange}>
                {
                    events.map((event, i) => {
                        if (i == this.state.endDate) {
                            return <option selected="selected" value={i}>{this.formatTimestamp(event)}</option>
                        } else {
                            return <option value={i}>{this.formatTimestamp(event)}</option>
                        }
                    })
                }
            </select>
        );
    }
}

