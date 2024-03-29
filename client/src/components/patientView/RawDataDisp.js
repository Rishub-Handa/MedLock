import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { Table } from 'react-bootstrap'; 
import { tickStep } from 'd3';
import "../../css/RawDataDisp.css";

class RawDataDisp extends Component {
    constructor(props) {
        super(props);
        var data = this.sequenceRawData(this.props.rawData);
        var dates = this.getAvailableDates(data);
        this.state = {
            data,
            dates, 
            selectedDateIndex: 0 
        }
    }

    componentDidMount() {
        console.log(this.props); 
    }

    sequenceRawData = (data) => {
        const dispenseData = data.dispenses.map(timestamp => (
            {
                type: "dispense", 
                timestamp: Date.parse(timestamp) 
            }
        )); 
        const colOffData = data.collarOff.map(timestamp => (
            {
                type: "colOff", 
                timestamp: Date.parse(timestamp) 
            }
        )); 
        const btn1Data = data.btn1.map(timestamp => (
            {
                type: "btn1", 
                timestamp: Date.parse(timestamp) 
            }
        )); 
        const btn2Data = data.btn2.map(timestamp => (
            {
                type: "btn2", 
                timestamp: Date.parse(timestamp) 
            }
        )); 
        const btn3Data = data.btn3.map(timestamp => (
            {
                type: "btn3", 
                timestamp: Date.parse(timestamp) 
            }
        )); 

        console.log(dispenseData); 
        console.log(colOffData); 
        var allData = dispenseData.concat(colOffData, btn1Data, btn2Data, btn3Data); 

        console.log(allData); 

        allData.sort((pt1, pt2) => pt1.timestamp - pt2.timestamp); 
        console.log(allData); 
        return allData;
    }

    getAvailableDates = (data) => {
        let availableDates = []; 
        data.forEach(pt => {
            const dateString = this.formatDate(pt.timestamp); 
            if(!availableDates.includes(dateString)) 
                availableDates.push(dateString); 
        }); 

        console.log(availableDates); 
        return availableDates;
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
    }

    getTableEntry = (pt) => {

        /* 
            const firstIndex = timestamp.indexOf('-') + 1; 
            let date = timestamp.substring(firstIndex, firstIndex + 2) + '/' + timestamp.substring(firstIndex + 3, firstIndex + 5); 
            console.log(timestamp); 
            let timeOfDay = "AM"; 
            let hour = timestamp.substring(firstIndex + 6, firstIndex + 8); 
            let hourNum = parseInt(hour); 
            if(hourNum == 12) {
                timeOfDay = "PM"; 
            } else if(hourNum > 12) {
                hourNum -= 12; 
                timeOfDay = "PM"; 
            } else if(hourNum == 24 || hourNum == 0) {
                hourNum = 12; 
                timeOfDay = "AM"; 
            }
            let minute = timestamp.substring(firstIndex + 9, firstIndex + 11); 
            return date + " " + String(hourNum) + ":" + minute + " " + timeOfDay; 
        */ 

        let resLabel = ""; 
        let resTime = "";
        let className = "";

        switch(pt.type) {
            case "dispense": 
                resLabel += " Dispense"
                className = "dispense-log";
                break; 
            case "colOff": 
                resLabel += " Removed Collar"
                className = "colOff-log";
                break; 
            case "btn1": 
                resLabel += " Green Button"
                className = "btn1-log";
                break; 
            case "btn2": 
                resLabel += " Yellow Button"
                className = "btn2-log";
                break; 
            case "btn3": 
                resLabel += " Red Button"
                className = "btn3-log";
                break; 
            default: 
                break; 
        } 

        const date = new Date(pt.timestamp); 
        resTime = date.toLocaleTimeString(); 

        return  (
            <tr>
                <td className={className}>{resTime}<b>{resLabel}</b></td>
            </tr>
        );

    }

    selectOnChange = (e) => {
        console.log(e.target.value); 
        this.setState({ selectedDateIndex: e.target.value }); 
    }

    dateSelector = (dates, selectedIndex) => {
        return (
            <select onChange={this.selectOnChange}>
                {dates.map((date, i) => {
                    if(i == selectedIndex) 
                        return <option selected="selected" value={i}>{date}</option>
                    else 
                        return <option value={i}>{date}</option>
                })}
            </select>
        )
    }

    getSelectedEntries = () => {
        var selectedEntries = this.state.data.filter(pt => this.formatDate(pt.timestamp) == this.state.dates[this.state.selectedDateIndex]);
        console.log(selectedEntries);
        return selectedEntries;
    }

    getTableEntries = (entries) => {
        var tableEntries = entries.map(pt => this.getTableEntry(pt));
        console.log(tableEntries);
        return tableEntries;
    }

    render() {
        console.log("rendering");
        console.log(this.state);
        var selectedEntries = this.getSelectedEntries();
        var tableEntries = this.getTableEntries(selectedEntries);
        return (
            <div>
                {this.dateSelector(this.state.dates, this.state.selectedDateIndex)}
                Raw Data Table 
                <table striped bordered hover> 
                    <thead>
                        <tr>
                            <th>Dispenser Log: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableEntries}
                    </tbody>
                </table> 
            </div>
        )
    }
}

RawDataDisp.propTypes = {
    patient: PropTypes.object.isRequired 
}


export default RawDataDisp; 