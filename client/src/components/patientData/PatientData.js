import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions'; 
import { fetchDispenser } from '../../actions/dispenserActions';  
import '../../css/PatientData.css'; 
import PDISurveyBar from '../graphs/PDISurveyBar';
import DateTimeScatter from '../graphs/DateTimeScatter';
import DataView from './DataView';

/** 
 * Component for displaying individual patient data
 * in the patient portal. 
 */

class PatientData extends Component {

    state = {
        retrievedData: false
    }

    // Fetch Surveys and Dispenses data from database 
    componentWillMount() {
        this.props.fetchPDISurveys(); 
        this.props.fetchDispenser(this.props.patient.medicalData.dispenser_id); 
    }

    render() {        
        const { allPDISurveys, 
                surveysLoading, 
                surveysLoaded,
                surveyError, 
                dispenser, 
                dispenserLoading, 
                dispenserLoaded,
                dispenserError } = this.props; 

        console.log(dispenser);

        if(surveyError || dispenserError) {
            return (
                <div>
                    <div>Survey Error: { surveyError ? surveyError.message : null}</div>
                    <div>Dispense Error: {dispenserError ? dispenserError.message : null}</div>
                </div>
            ); 
        }

        if(surveysLoading || dispenserLoading || !surveysLoaded || !dispenserLoaded) {
            return (
                <div>Loading . . . </div>
            )
        }

        var data = {}
        if (allPDISurveys) {
            data = {
                ...data,
                pdisurveys: allPDISurveys,
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
            <div className="pd-container">
                    <h1 className="pd-title">
                        My Data
                    </h1>
                <DataView data={data} />
            </div>
        );
        
    }
}

PatientData.propTypes = {
    fetchPDISurveys: PropTypes.func.isRequired,
    allPDISurveys: PropTypes.array.isRequired, 
    surveysLoading: PropTypes.bool.isRequired,
    surveysLoaded: PropTypes.bool.isRequired,
    surveyError: PropTypes.object,

    fetchDispenser: PropTypes.func.isRequired, 
    dispenser: PropTypes.array.isRequired,
    dispenserLoading: PropTypes.bool.isRequired,
    dispenserLoaded: PropTypes.bool.isRequired,
    dispenserError: PropTypes.object
}

const mapStateToProps = state => ({
    allPDISurveys: state.surveyState.responses, 
    surveysLoading: state.surveyState.surveysLoading,
    surveysLoaded: state.surveyState.surveysLoaded,
    surveyError: state.surveyState.error,  
    dispenser: state.dispenseState.dispenser, 
    dispenserLoading: state.dispenseState.dispenserLoading,
    dispenserLoaded: state.dispenseState.dispenserLoaded,
    dispenserError: state.dispenseState.error 

});

export default connect(mapStateToProps, { fetchPDISurveys, fetchDispenser })(PatientData);
