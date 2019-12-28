import React, { Component } from 'react'; 
import auth0client from '../../auth/Auth';
const axios = require('axios'); 

class Dispenser extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: props.profile.medicalData.dispenser_id,
        }
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value  
        })
    }

    onSubmit = (e) => {
        e.preventDefault(); 

        const dispenseTime = new Date(); 
        dispenseTime.setFullYear(parseInt(this.state.date.substring(6, 10))); 
        dispenseTime.setMonth(parseInt(this.state.date.substring(0, 2)) - 1); 
        dispenseTime.setDate(parseInt(this.state.date.substring(3, 5))); 
        dispenseTime.setUTCHours(parseInt(this.state.time.substring(0, 2)) + 4); 
        dispenseTime.setMinutes(parseInt(this.state.time.substring(3, 5))); 

        console.log(dispenseTime.toString()); 
    
        const dispenseSeconds = dispenseTime.getTime(); 

        console.log(dispenseSeconds); 
        console.log(dispenseTime); 

        const data = {
            id: this.state.id, 
            timestamp: dispenseSeconds 
        }

        const { getAccessToken } = auth0client;
        const API_URL = 'http://localhost:5000/api';
        const headers = { 'Authorization': `Bearer ${getAccessToken()}`}; 
        
        axios.post(`${API_URL}/dispense`, data, { headers }) 
            .then(res => {
                console.log(res); 
            }) 
            .catch(err => console.log(err)); 
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                            name="date"
                            placeholder="mm/dd/yy"
                            onChange={this.onChange}/>
                    <input type="text" 
                            name="time"
                            placeholder="hh:mm military time"
                            onChange={this.onChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default Dispenser; 