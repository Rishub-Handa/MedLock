import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { saveProfile } from '../../actions/profileActions'; 
import { resetPassword } from '../../auth/AuthManagement'; 
import auth0client from '../../auth/Auth'; 

class NewUser extends Component {

    state = {}

    onSubmit = e => {
        e.preventDefault(); 
        const personalData = {
            name: this.state.name, 
            birthday: this.state.birthday, 
            phone: this.state.phone, 
            sex: this.state.sex, 
            address: {
                street: this.state.street, 
                city: this.state.city, 
                state: this.state.state, 
                zip: this.state.zip 
            }
        }; 
        this.props.saveProfile(personalData); 

        if(this.state.password === this.state.confirmPassword) { 
            const { userProfile } = auth0client; 
            resetPassword(userProfile.name); 
        }

        this.props.toggle(); 
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
                    <p>New Password: <input type="password" name="password" onChange={this.onChange} required /></p>
                    <p>Confirm New Password: <input type="password" name="confirmPassword" onChange={this.onChange} required /></p>
                    <button type="submit">Submit and Reset Password </button>
                </form>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    AMT: state.authState.AMT, 
    AMTLoading: state.authState.AMTLoading, 
    AMTError: state.authState.AMTError 
});

export default connect(mapStateToProps, { saveProfile })(NewUser); 