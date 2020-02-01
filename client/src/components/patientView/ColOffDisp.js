import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 
import { Table } from 'react-bootstrap'; 

class ColOffDisp extends Component {

    componentDidMount() {
        console.log(this.props); 
    }

    formatTimestamp = (timestamp) => {

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
    }

    render() {
        return (
            <div>
                Collar Off Table 
                <Table striped bordered hover> 
                    <thead>
                        <tr>
                            <th>Collar Opened: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.colOffData.map(timestamp => (
                                <tr>
                                    <td>{this.formatTimestamp(timestamp)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table> 
            </div>
        )
    }
}

ColOffDisp.propTypes = {
    patient: PropTypes.object.isRequired 
}


export default ColOffDisp; 