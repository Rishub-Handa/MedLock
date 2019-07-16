import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../../css/PatientListItem.css';

export default class PatientListItem extends Component {

    render() {
        const { patient, viewPatient, deletePatient } = this.props;

        return (
            <div className="PatientListItem-container">
                
                <div>
                    <h4>{patient.personalData.name}</h4>
                </div>
                
                <div>
                    <Button onClick={() => viewPatient(patient)}>View</Button>
                    <Button onClick={() => deletePatient(patient)}>Delete</Button>
                </div>

            </div>
        );
    }
}
