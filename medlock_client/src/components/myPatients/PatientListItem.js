import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class PatientListItem extends Component {


    render() {
        const { patient, viewPatient } = this.props;

        return (
            <div>
                <div>
                    <h4>{patient.personalData.name}</h4>
                </div>
                <div>
                    <Button onClick={viewPatient}>View</Button>
                </div>
            </div>
        );
    }
}
