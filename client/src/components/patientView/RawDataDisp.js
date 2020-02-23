import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { Table } from 'react-bootstrap'; 
import { tickStep } from 'd3';

class RawDataDisp extends Component {
    
    state = {
        data: [], 
        dates: [], 
        selectedDateIndex: 0 
    }

    componentDidMount() {
        console.log(this.props); 
        this.sequenceRawData(this.props.rawData); 
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
        const allData = dispenseData.concat(colOffData, btn1Data, btn2Data, btn3Data); 

        console.log(allData); 

        allData.sort((pt1, pt2) => pt1.timestamp - pt2.timestamp); 
        console.log(allData); 
        this.setState({ data: allData }); 
        
        // Order timestamps 
        // Add to chart 
        // Have chart show 20 data points at a time 
        this.getAvailableDates(allData); 

    }

    getAvailableDates = (data) => {
        let availableDates = []; 
        data.forEach(pt => {
            const dateString = this.formatDate(pt.timestamp); 
            if(!availableDates.includes(dateString)) 
                availableDates.push(dateString); 
        }); 

        console.log(availableDates); 
        this.setState({ dates: availableDates }); 
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

        let res = ""; 

        switch(pt.type) {
            case "dispense": 
                res += "Dispense: "
                break; 
            case "colOff": 
                res += "Removed Collar: "
                break; 
            case "btn1": 
                res += "Green Button: "
                break; 
            case "btn2": 
                res += "Yellow Button: "
                break; 
            case "btn3": 
                res += "Red Button: "
                break; 
            default: 
                break; 
        } 

        const date = new Date(pt.timestamp); 
        res += date.toLocaleTimeString(); 

        return  (
            <tr>
                <td>{res}</td>
            </tr>
        )

    }

    selectOnChange = (e) => {
        console.log(e.target.value); 
        this.setState({ selectedDateIndex: e.target.value }); 
    }

    dateSelector = (dates, selectedIndex) => (
        <select onChange={this.selectOnChange}>
            {dates.map((date, i) => {
                if(i == selectedIndex) 
                    return <option selected="selected" value={i}>{date}</option>
                else 
                    return <option value={i}>{date}</option>
            })}
        </select>
    )

    render() {
        return (
            <div>
                {this.dateSelector(this.state.dates, this.state.selectedDateIndex)}
                Raw Data Table 
                <Table striped bordered hover> 
                    <thead>
                        <tr>
                            <th>Dispenses: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(pt => {
                                if(this.formatDate(pt.timestamp) == this.state.dates[this.state.selectedDateIndex]) {
                                    return this.getTableEntry(pt); 
                                }
                            })
                        }
                    </tbody>
                </Table> 
            </div>
        )
    }
}

RawDataDisp.propTypes = {
    patient: PropTypes.object.isRequired 
}


export default RawDataDisp; 