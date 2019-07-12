import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PatientListItem from './PatientListItem';
import '../../css/PatientList.css';

class PatientList extends Component {

    patientHTML = (patients) => {
        return patients.map(patient => (
            <PatientListItem className="listItem" patient={patient} viewPatient={this.props.onClickPatient} />
        ));
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h3>My Patients</h3>
                <div className="PatientList-container">{this.patientHTML(this.props.patients)}</div>
            </div>
        );
    }
}

export default PatientList; 
