import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PatientListItem from './PatientListItem';

class PatientList extends Component {

    patientHTML = (patients) => {
        return patients.map(patient => (
            <PatientListItem patientInfo={patient} viewPatient={this.props.onClickPatient} />
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
