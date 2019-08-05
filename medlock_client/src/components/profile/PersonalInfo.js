import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import '../../css/Profile.css';
import profilePic from './profile_pic.jpg';
import editPic from './edit-profile.png';
/**
 * Component to display personal info on the profile page.
 */

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            personalData: props.personalData,
        };
    }

    patientFormHTML = () => {
        return (
            <div className="personalInfo-editable">
                <Form>
                    <FormGroup>
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
                        <Input type="text" name="address.street" id="pi-addr" placeholder="123 Direwolf Ave" value={this.state.personalData.address.street} onChange={this.onChange} />
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
                    <FormGroup>
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
                    <FormGroup>
                        <Label for="pi-bio">Biography</Label>
                        <Input type="textarea" name="bio" id="pi-bio" placeholder="I lived one hell of a life (and death and life). Heir to the Iron Throne but raised as a bastard. I rode a dragon a couple times. Also, I had sex with my aunt, then killed her." value={this.state.personalData.bio} onChange={this.onChange} />
                    </FormGroup>
                    <Button onClick={() => this.props.onProfileSave(this.state.personalData)}>Save</Button>
                </Form>
            </div>
        )
    }

    providerFormHTML = () => {
        return (
            <div className="personalInfo-editable">
                <Form>
                    <FormGroup>
                        <Label for="pi-name">Full Name</Label>
                        <Input type="text" name="name" id="pi-name" placeholder="Jon Snow" value={this.state.personalData.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-email">Email</Label>
                        <Input type="email" name="email" id="pi-email" placeholder="jon.snow@nightswatch.org" value={this.state.personalData.email} onChange={this.onChange} />
                    </FormGroup>
                    <Button onClick={() => this.props.onProfileSave(this.state.personalData)}>Save</Button>
                </Form>
            </div>
        );
    }

    editableHTML = () => {
        const { role } = this.props;
        if (role === "Patient") {
            return this.patientFormHTML();
        }
        else {
            return this.providerFormHTML();
        }   
    }

    patientProfileInfo = (personalData) => {
        return (
            <div class="profile-page">
                <div align="center">
                    <div align="right">
                        <Button variant="light" onClick={this.props.onProfileEdit}>Edit Profile<img src ={editPic} width="35" height="35"/></Button>
                    </div>
                    <img class="profile-picture-onPage" src={profilePic}/>
                    <h2>{personalData.name}</h2>
                </div>
                <div>
                    <div class="biography" align="center">
                        <div class="biographyHeader">
                        <h4>About Me: </h4>
                        </div>
                        <p>{personalData.bio} </p>
                    </div>
                    <div class="userInfo" align="center">
                        <h6>Sex: {personalData.sex}</h6>
                        <h6>Birthday: {personalData.birthday}</h6>
                        <h6>Address: {personalData.address.street} {personalData.address.city}, {personalData.address.state} {personalData.address.zip}</h6>
                        <h6>Email: {personalData.email}</h6>
                        <h6>Phone: {personalData.phone}</h6>
                        <h6>Chat Name: {personalData.chatname}</h6>
                    </div>
                </div>
            </div>
        );  
    }

    providerProfileInfo = (personalData) => {
        return (
            <div>
                <h2>Name: {personalData.name}</h2>
                <h6>Email: {personalData.email}</h6>
            </div>
        );
    }

    staticHTML = () => {
        const { personalData, role } = this.props;
        if (role === "Patient") {
            return (
                <div className="personalInfo-static" align="center">
                {this.patientProfileInfo(personalData)}
            </div>
            )
        }
        else {
            return (
                <div className="personalInfo-static">
                {this.providerProfileInfo(personalData)}
                <div>
                    <Button onClick={this.props.onProfileEdit}>Edit</Button>
                </div>
            </div>
            )
        }
    }

    onChange = (e) => {
        console.log(this.state.personalData);
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
        const { editable } = this.props;
        if (editable) {
            return this.editableHTML();
        } else {
            return this.staticHTML();
        }
    }
}

export default PersonalInfo;
