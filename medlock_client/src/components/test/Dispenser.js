import React, { Component } from 'react'; 
import auth0client from '../../auth/Auth';
const axios = require('axios'); 

class Dispenser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.profile.dispenser_id
        }
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value  
        })
    }

    onSubmit = (e) => {
        e.preventDefault(); 
        const dispense = {}; 
        Object.assign(dispense, this.state);
        const { getAccessToken } = auth0client;
        const API_URL = 'http://localhost:5000/api';
        const headers = { 'Authorization': `Bearer ${getAccessToken()}`};
        axios.post(`${API_URL}/dispense`, dispense, { headers }) 
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