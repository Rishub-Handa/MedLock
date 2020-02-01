import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import '../../css/Profile.css';
import profilePic from './profile_pic.png';
/**
 * Component to display personal info on the profile page.
 */

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personalData: props.personalData,
        };
    }

    patientFormHTML = () => {
        return (
            <div className="personalInfo-editable">
                <Form>
                    <FormGroup>
                        <Label for="pi-name" className="form-heading">Full Name</Label>
                        <Input type="text" name="name" id="pi-name" placeholder="Jon Snow" value={this.state.personalData.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-sex" className="form-heading">Sex</Label>
                        <Input type="select" name="sex" id="pi-sex" value={this.state.personalData.sex} onChange={this.onChange}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-dob" className="form-heading">Birthday</Label>
                        <Input type="date" name="birthday" id="pi-dob" value={this.state.personalData.birthday} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-addr" className="form-heading">Address</Label>
                        <Input type="text" name="address.street" id="pi-addr" placeholder="123 Direwolf Ave" value={this.state.personalData.address.street} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-city" className="form-heading">City</Label>
                        <Input type="text" name="city" id="pi-city" placeholder="Winterfell" value={this.state.personalData.address.city} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-state" className="form-heading">State</Label>
                        <Input type="text" name="state" id="pi-state" placeholder="The North" value={this.state.personalData.address.state} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-zip" className="form-heading">Zip</Label>
                        <Input type="text" name="zip" id="pi-zip" placeholder="12345" value={this.state.personalData.address.zip} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-email" className="form-heading">Email</Label>
                        <Input type="email" name="email" id="pi-email" placeholder="jon.snow@nightswatch.org" value={this.state.personalData.email} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-phone" className="form-heading">Phone</Label>
                        <Input type="text" name="phone" id="pi-phone" placeholder="(555) 555-5555" value={this.state.personalData.phone} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-chatname" className="form-heading">Chat Name</Label>
                        <Input type="text" name="chatname" id="pi-chatname" placeholder="jsnow" value={this.state.personalData.chatname} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-bio" className="form-heading">Biography</Label>
                        <Input type="textarea" name="bio" id="pi-bio" placeholder="I lived one hell of a life (and death and life). Heir to the Iron Throne but raised as a bastard. I rode a dragon a couple times. Also, I had sex with my aunt, then killed her." value={this.state.personalData.bio} onChange={this.onChange} />
                    </FormGroup>
                    <Button className="blue-button" onClick={() => this.props.onProfileSave(this.state.personalData)}>Save</Button>
                </Form>
            </div>
        )
    }

    providerFormHTML = () => {
        return (
            <div className="personalInfo-editable">
                <Form>
                    <FormGroup>
                        <Label for="pi-name" className="form-heading">Full Name</Label>
                        <Input type="text" name="name" id="pi-name" placeholder="Jon Snow" value={this.state.personalData.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-email" className="form-heading">Email</Label>
                        <Input type="email" name="email" id="pi-email" placeholder="jon.snow@nightswatch.org" value={this.state.personalData.email} onChange={this.onChange} />
                    </FormGroup>
                    <Button className="blue-button" onClick={() => this.props.onProfileSave(this.state.personalData)}>Save</Button>
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
                    <h3 style={{ fontWeight: "bold", color: "var(--medlock-dark-gray)" }}>{personalData.name}</h3>
                </div>
                <div>
                    <div class="biography" align="center">
                        <div class="biographyHeader">
                            <h4 style={{fontWeight: "800", color: "white", marginBottom: "0px"}}>About Me</h4>
                        </div>
                        <p style={{color: "white"}}>{personalData.bio} </p>
                    </div>
                    <div align="center">
                        <div style={{ textAlign: "left" }}>
                            <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Sex:</h5>
                            <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.sex}</h5>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Birthday:</h5>
                            <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.birthday.split('T')[0]}</h5>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Address:</h5>
                            <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.address.street} {personalData.address.city}, {personalData.address.state} {personalData.address.zip}</h5>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Email:</h5>
                            <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.email}</h5>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Phone:</h5>
                            <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.phone}</h5>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Chat Name:</h5>
                            <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.chatname}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    providerProfileInfo = (personalData) => {
        return (
            <div>
                <div style={{ textAlign: "left" }}>
                    <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Name:</h5>
                    <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.name}</h5>
                </div>
                <div style={{ textAlign: "left" }}>
                    <h5 style={{ display: "inline", color: "var(--medlock-gray)" }}>Email:</h5>
                    <h5 style={{ display: "inline", color: "var(--medlock-dark-gray)", fontWeight: "bold", paddingLeft: "10px" }}>{personalData.email}</h5>
                </div>
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
                </div>
            )
        }
    }

    onChange = (e) => {
        console.log(this.state.personalData);
        if (e.target.name === "street" || e.target.name === "city" ||
            e.target.name === "state" || e.target.name === "zip") {
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
