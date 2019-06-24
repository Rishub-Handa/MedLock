import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { saveProfile } from '../../actions/profileActions'; 

class NewUser extends Component {

    state = {}

    onSubmit = e => {
        e.preventDefault(); 
        const personalData = {}; 
        Object.assign(personalData, this.state); 
        this.props.saveProfile(personalData); 
    }

    onChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>Name: <input type="text" name="name" onChange={this.onChange} required/></p>
                    <p>Birthday: <input type="text" name="birthday" onChange={this.onChange}/></p>
                    <p>Phone: <input type="text" name="phone" onChange={this.onChange}/></p>
                    <p>Sex: <select name="sex" onChange={this.onChange} required>
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select></p>
                    <p>Address: </p>
                    <p>Street: <input type="text" name="street" onChange={this.onChange} required/></p>
                    <p>City: <input type="text" name="city" onChange={this.onChange} required/></p>
                    <p>State: <input type="text" name="state" onChange={this.onChange} required/></p>
                    <p>Zip Code: <input type="number" name="zip" onChange={this.onChange} required/></p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
} 
export default connect(null, { saveProfile })(NewUser); 