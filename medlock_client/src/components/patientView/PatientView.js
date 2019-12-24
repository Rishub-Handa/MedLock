import React, { Component } from 'react';
import PersonalDataView from './PersonalDataView';
import { connect } from 'react-redux';
import { fetchDispenser } from '../../actions/dispenserActions';  
import DataView from '../patientData/DataView';
import PropTypes from 'prop-types';
import '../../css/PatientView.css';

class PatientView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDispenser(this.props.patient.medicalData.dispenser_id); 
    }

    render() {
        console.log("Patient View");
        console.log(this.props);

        const { patient,
                dispenser, 
                dispenserLoading, 
                dispenserLoaded,
                dispenserError } = this.props; 
        console.log(patient);
        console.log(patient.medicalData);
        console.log(patient.medicalData.surveys);

        const { pdiSurveys } = patient.medicalData.surveys;

        if(dispenserError) {
            return (
                <div>
                    <div>Dispense Error: {dispenserError.message}</div>
                </div>
            ); 
        }

        if(dispenserLoading || !dispenserLoaded) {
            return (
                <div>Loading . . . </div>
            )
        }

        if (!dispenserLoading && dispenserLoaded && !dispenser) {
            return (
                <div>This patient doesn't yet have a dispenser.</div>
            )
        }

        var data = {}
        if (pdiSurveys) {
            data = {
                ...data,
                pdisurveys: pdiSurveys,
            }
        }

        if (dispenser) {
            data = {
                ...data,
                dispenses: dispenser.events.dispenses,
                btn1: dispenser.events.btn1,
                btn2: dispenser.events.btn2,
                btn3: dispenser.events.btn3,
            }
        }

        return (
            <div className="patientView-container">
                <PersonalDataView personalData={patient.personalData} />
                <DataView data={data}
                />
                {/* <div className="leftPanel">
                    <PersonalDataView personalData={patient.personalData} />
                    <ConsumptionDataView medicalData={patient.medicalData} data={{pdiSurveys, dispenses}}/>
                </div>
                <div className="rightPanel">
                    <MedicalDataView medicalData={patient.medicalData} data={{pdiSurveys, dispenses}} />
                </div> */}
            </div>
        )
    }
}

PatientView.propTypes = {
    fetchDispenser: PropTypes.func.isRequired, 
    dispenser: PropTypes.object.isRequired,
    dispenserLoading: PropTypes.bool.isRequired,
    dispenserLoaded: PropTypes.bool.isRequired,
    dispenserError: PropTypes.object
}

const mapStateToProps = state => ({
    dispenser: state.dispenseState.dispenser, 
    dispenserLoading: state.dispenseState.dispenserLoading,
    dispenserLoaded: state.dispenseState.dispenserLoaded,
    dispenserError: state.dispenseState.error 
})

export default connect(mapStateToProps, { fetchDispenser })(PatientView);
