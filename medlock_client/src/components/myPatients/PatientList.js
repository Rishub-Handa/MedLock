import React, { Component } from 'react';
import { Button } from 'reactstrap';

class PatientList extends Component {

    patientHTML = () => {
        this.props.patients.map(patient => {
            <div>
                <h1>{patient.name}</h1>
            </div>
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h3>My Patients</h3>
                    <div>{this.patientHTML()}</div>
                </div>
                <Button onClick={this.props.onClick}>Add Patient</Button>
            </div>
        )
    }
}

export default PatientList; 
