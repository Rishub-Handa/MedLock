import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions'; 
import { fetchDispenser } from '../../actions/dispenserActions';  
import '../../css/PatientData.css'; 
import PDISurveyBar from '../graphs/PDISurveyBar';
import DateTimeScatter from '../graphs/DateTimeScatter';
import DataView from './DataView';
import CheckIn from './CheckIn'; 
import { addCheckIn } from '../../actions/patientActions'; 

/** 
 * Component for displaying individual patient data
 * in the patient portal. 
 */

class PatientData extends Component {

    state = {
        retrievedData: false, 
        showCheckIn: false 
    } 

    submitCheckIn = (checkInResponses) => {
        console.log(checkInResponses); 
        this.setState({ showCheckIn: false }); 
        this.props.addCheckIn(checkInResponses); 
        
        // Show submitted CheckIn 
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
                dispenserError, 
                checkInData, 
                checkInLoading, 
                checkInError } = this.props; 

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
                <h1 className="header">
                    My Data
                </h1>
                {!checkInData && !checkInLoading && !checkInError && !this.state.showCheckIn && 
                    <button onClick={() => { this.setState({ showCheckIn: true }); }}>Add Check In</button>} 
                {!checkInData && !checkInLoading && !checkInError && this.state.showCheckIn && 
                    <CheckIn submitData={this.submitCheckIn}/>}
                {checkInLoading && <p>Loading . . .</p>}
                {checkInError && <p>There was an error in sending the data. </p>}
                {checkInData && <p>Thank you, the data has been saved. </p>}
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
    allPDISurveys: state.surveyState.PDIResponses, 
    surveysLoading: state.surveyState.PDISurveysLoading,
    surveysLoaded: state.surveyState.PDISurveysLoaded,
    surveyError: state.surveyState.PDIError,  
    dispenser: state.dispenseState.dispenser, 
    dispenserLoading: state.dispenseState.dispenserLoading,
    dispenserLoaded: state.dispenseState.dispenserLoaded,
    dispenserError: state.dispenseState.error, 
    checkInData: state.patientState.checkInData,
    checkInLoading: state.patientState.checkInLoading, 
    checkInError: state.patientState.checkInError 

});

export default connect(mapStateToProps, { fetchPDISurveys, fetchDispenser, addCheckIn })(PatientData); 