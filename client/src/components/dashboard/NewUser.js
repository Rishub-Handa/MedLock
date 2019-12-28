import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { saveProfile } from '../../actions/profileActions'; 
import { resetPassword } from '../../auth/AuthManagement'; 
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import auth0client from '../../auth/Auth';

class NewUser extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            personalData: {
                ...props.profile.personalData,
                sex: "Other",
                address: {
                    street: "",
                    city: "",
                    state: "",
                    zip: ""
                }
            }
        };
    }

    onSubmit = e => {
        e.preventDefault(); 
        this.props.saveProfile(this.state.personalData, this.props.role); 
        
        // Send Password Reset Email and Test Temporary Password Email 
        resetPassword(this.props.profile.personalData.email); 
        this.props.toggle(); 
    }

    onChange = e => {
        if (e.target.name === "street" || e.target.name === "city"   ||
            e.target.name === "state"  || e.target.name === "zip") {
            this.setState({
                personalData: {
                    ...this.state.personalData,
                    address: {
                        ...this.state.personalData.address,
                        [e.target.name]: e.target.value
                    }
                }
            });
        } else {
            this.setState({ 
                personalData: {
                    ...this.state.personalData,
                    [e.target.name]: e.target.value 
                }
            });
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup required>
                        <Label for="pi-name">Full Name</Label>
                        <Input type="text" name="name" id="pi-name" placeholder="Jon Snow" value={this.state.personalData.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-sex">Sex</Label>
                        <Input type="select" name="sex" id="pi-sex" value={this.state.personalData.sex} onChange={this.onChange}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-dob">Birthday</Label>
                        <Input type="date" name="birthday" id="pi-dob" value={this.state.personalData.birthday} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-addr">Address</Label>
                        <Input type="text" name="street" id="pi-addr" placeholder="123 Direwolf Ave" value={this.state.personalData.address.street} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-city">City</Label>
                        <Input type="text" name="city" id="pi-city" placeholder="Winterfell" value={this.state.personalData.address.city} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-state">State</Label>
                        <Input type="text" name="state" id="pi-state" placeholder="The North" value={this.state.personalData.address.state} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-zip">Zip</Label>
                        <Input type="text" name="zip" id="pi-zip" placeholder="12345" value={this.state.personalData.address.zip} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup required>
                        <Label for="pi-email">Email</Label>
                        <Input type="email" name="email" id="pi-email" placeholder="jon.snow@nightswatch.org" value={this.state.personalData.email} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-phone">Phone</Label>
                        <Input type="text" name="phone" id="pi-phone" placeholder="(555) 555-5555" value={this.state.personalData.phone} onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-chatname">Chat Name</Label>
                        <Input type="text" name="chatname" id="pi-chatname" placeholder="jsnow" value={this.state.personalData.chatname} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup required>
                        <Label for="pi-bio">Biography</Label>
                        <Input type="textarea" name="bio" id="pi-bio" placeholder="I lived one hell of a life (and death and life). Heir to the Iron Throne but raised as a bastard. I rode a dragon a couple times. Also, I had sex with my aunt, then killed her." value={this.state.personalData.bio} onChange={this.onChange} />
                    </FormGroup>
                    <Button onClick={this.onSubmit}>Save</Button>
                </Form>
            </div>
        );
    }
} 

const mapStateToProps = state => ({
    AMT: state.authState.AMT, 
    AMTLoading: state.authState.AMTLoading, 
    AMTError: state.authState.AMTError, 
});

export default connect(mapStateToProps, { saveProfile })(NewUser); 