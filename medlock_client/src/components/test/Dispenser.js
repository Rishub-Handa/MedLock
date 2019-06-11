import React, { Component } from 'react'; 
const axios = require('axios'); 

class Dispenser extends Component {

    state = {
        id: 1 
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
        axios.post('http://localhost:5000/api/dispense', dispense) 
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