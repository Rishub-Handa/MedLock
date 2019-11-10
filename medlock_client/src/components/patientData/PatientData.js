import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions'; 
import { fetchDispenser } from '../../actions/dispenserActions';  
import AveragePDISurveyBar from '../graphs/AveragePDISurveyBar';
import '../../css/PatientData.css'; 
import PDISurveyLine from '../graphs/PDISurveyLine';
import PDISurveyStack from '../graphs/PDISurveyStack';
import DispenseScatter from '../graphs/DispenseScatter';
import PDISurveyPie from '../graphs/PDISurveyPie';
import PDISurveyBar from '../graphs/PDISurveyBar';
import DateTimeScatter from '../graphs/DateTimeScatter';

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
        this.props.fetchDispenser(this.props.profile.medicalData.dispenser_id); 
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
        if(dispenser != null){
            return (
                <div className="pd-container">
                        <h1 className="pd-title">
                            My Data
                        </h1>
                    <div className="pd-body">
                        <PDISurveyBar id="g0" data={allPDISurveys} />
                        <DateTimeScatter 
                            id="g1"
                            title="Button Presses" 
                            data={[dispenser.events.btn1, dispenser.events.btn2, dispenser.events.btn3]} 
                            colors={["red", "blue", "green"]}
                        />
                        <DateTimeScatter 
                            id="g2"
                            title="Dispenses"
                            data={[dispenser.events.dispenses]}
                            colors={["var(--medlock-blue)"]}
                        />
                    </div>
                </div>
            );
        }
        return (
            <div className="pd-container">
                    <div className="pd-body">
                        <h1>My Data</h1>
                        <div>
                            <AveragePDISurveyBar data={allPDISurveys} />
                        </div>
                        <div>
                            <PDISurveyLine data={allPDISurveys} />
                        </div>
                        <div>
                            <PDISurveyStack data={allPDISurveys} />
                        </div>
                        <div>
                            <PDISurveyPie data={allPDISurveys} />
                        </div>
                    </div>
                </div>
        )
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

