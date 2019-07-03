import React, { Component } from 'react';
import PersonalDataView from './PersonalDataView';
import MedicalDataView from './MedicalDataView';
import ConsumptionDataView from './ConsumptionDataView';
import '../../css/PatientView.css';

class PatientView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { patient } = this.props;
        return (
            <div className="patientView-container">
                <div className="leftPanel">
                    <PersonalDataView personalData={patient.personalData} />
                    <MedicalDataView medicalData={patient.medicalData} />
                </div>
                <div className="rightPanel">
                    <ConsumptionDataView medicalData={patient.medicalData} />
                </div>
            </div>
        )
    }
}

export default PatientView;
