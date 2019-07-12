import React, { Component } from 'react';
import PersonalDataView from './PersonalDataView';
import MedicalDataView from './MedicalDataView';
import ConsumptionDataView from './ConsumptionDataView';
import { connect } from 'react-redux';
import { fetchDispenser } from '../../actions/dispenserActions';  
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
        const { patient,
                dispenser, 
                dispenserLoading, 
                dispenserLoaded,
                dispenserError } = this.props; 
        
        let dispenses = null;
        if(!dispenser) dispenses = [];
        else dispenses = dispenser.dispenses;
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

        return (
            <div className="patientView-container">
                <div className="leftPanel">
                    <PersonalDataView personalData={patient.personalData} />
                    <ConsumptionDataView medicalData={patient.medicalData} data={{pdiSurveys, dispenses}}/>
                </div>
                <div className="rightPanel">
                    <MedicalDataView medicalData={patient.medicalData} data={{pdiSurveys, dispenses}} />
                </div>
            </div>
        )
    }
}

PatientView.propTypes = {
    fetchDispenser: PropTypes.func.isRequired, 
    dispenser: PropTypes.array.isRequired,
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
