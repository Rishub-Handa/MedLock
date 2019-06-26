import React, { Component } from 'react';
import PersonalDataView from './PersonalDataView';
import MedicalDataView from './MedicalDataView';
import ConsumptionDataView from './ConsumptionDataView';

class PatientView extends Component {
    render() {
        return (
            <div className="patientDataView-container">
                <div className="leftPanel">
                    <PersonalDataView />
                    <MedicalDataView />
                </div>
                <div className="rightPanel">
                    <ConsumptionDataView />
                </div>
            </div>
        )
    }
}

export default PatientView;
