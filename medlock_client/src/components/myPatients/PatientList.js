import React, { Component } from 'react';
import { Button } from 'reactstrap';

class PatientList extends Component {

    patientHTML = (patients) => {
        return patients.map(patient => (
            <div>
                <h1>{patient.name}</h1>
            </div>
        ));
    }

    render() {
        return (
            <div>
                <h3>My Patients</h3>
                <div>{this.patientHTML(this.props.patients)}</div>
            </div>
        );
    }
}

export default PatientList; 
