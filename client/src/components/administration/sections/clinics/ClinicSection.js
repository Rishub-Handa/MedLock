import React, { Component } from 'react';
import UserList from '../../../users/UserList';
import '../../../../css/Admin.css';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';


export default class ClinicSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createNewClinicForm: false,
            newClinicName: "",
        }
    }
    
    viewClinic = (clinic) => {
        console.log(`View Clinic: ${clinic}`);
    }

    clinicListHTML = () => {
        return this.props.clinics.map(clinic => {
            return (
                <p>{clinic.name}</p>
            );
        })
    }

    showRegisterClinicForm = () => {
        this.setState({
            createNewClinicForm: true,
        });
    }

    onFormChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createNewClinicForm = () => {
        if (this.state.createNewClinicForm) {
            return (
                <div className="registerNewClinicForm">
                    <Form>
                        <FormGroup className="input-form-group">
                            <Label for="newClinicName" className="form-heading">Name: </Label>
                            <Input
                                type="text"
                                name="newClinicName"
                                id="newClinicName"
                                onChange={this.onFormChange} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <button style={{float: "left"}} className="create-new-btn" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    createNewClinicForm: false,
                                });
                                this.props.registerClinic(this.state.newClinicName);
                            }}>Register Clinic</button>
                            <button style={{float: "left"}} className="cancel-button" onClick={() => {
                                this.setState({
                                    ...this.state,
                                    createNewClinicForm: false,
                                });
                            }}>Cancel</button>
                        </FormGroup>
                    </Form>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.showRegisterClinicForm}>Register Clinic</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="ClinicSection">
                <div className="ClinicSection-header">
                    <h3 className="header">Clinics</h3>
                </div>
                <div className="ClinicSection-content">
                    <div className="ClinicList-container">
                        {this.clinicListHTML()}
                    </div>
                    {this.createNewClinicForm()}
                </div>
            </div>
        )
    }
}
