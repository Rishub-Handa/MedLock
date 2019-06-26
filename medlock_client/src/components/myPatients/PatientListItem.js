import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class PatientListItem extends Component {


    render() {
        const { patientInfo, viewPatient } = this.props;

        return (
            <div>
                <div>
                    <h4>{patientInfo.name}</h4>
                </div>
                <div>
                    <Button onClick={viewPatient}>View</Button>
                </div>
            </div>
        );
    }
}
