import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

/**
 * Component to display personal info on the profile page.
 */

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            personalData: props.personalData
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
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-dob">Birthday</Label>
                        <Input type="date" name="birthday" id="pi-dob" value={this.state.personalData.birthday} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pi-addr">Address</Label>
                        <Input type="text" name="address" id="pi-addr" placeholder="123 Direwolf Ave Winterfell, Westeros 22301" value={this.state.personalData.address} onChange={this.onChange} />
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
            <div>
                <h2>Name: {personalData.name}</h2>
                <h4>Biography: {personalData.bio}</h4>
                <h6>Sex: {personalData.sex}</h6>
                <h6>Birthday: {personalData.birthday}</h6>
                <h6>Street: {personalData.address.street}</h6>
                <h6>Email: {personalData.email}</h6>
                <h6>Phone: {personalData.phone}</h6>
                <h6>Chat Name: {personalData.chatname}</h6>
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
                <div className="personalInfo-static">
                {this.patientProfileInfo(personalData)}
                <div>
                    <Button onClick={this.props.onProfileEdit}>Edit</Button>
                </div>
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
        this.setState({
            personalData: {
                ...this.state.personalData,
                [e.target.name] : e.target.value
            }
        });
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
