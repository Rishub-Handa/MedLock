import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions';
import { fetchDispenser } from '../../actions/dispenserActions';
import DispenserCode from './DispenserCode';
import AddDispenser from './AddDispenser';
import '../../css/PatientData.css';
import DataView from './DataView';
import SummaryStats from './SummaryStats';

/** 
 * Component for displaying individual patient data
 * in the patient portal. 
 */

class PatientData extends Component {

    state = {
        retrievedData: false,
        toggleCodeDisplay: false,
	    hasDispenser: false 
    }

    // Fetch Surveys and Dispenses data from database 
    componentWillMount() {
        this.props.fetchPDISurveys();
        if (this.props.patient.medicalData != null) {
            if (this.props.patient.medicalData.dispenser_id != null) {
                this.props.fetchDispenser(this.props.patient.medicalData.dispenser_id);
	        }
        }
    }

    addDispenserHTML = () => {
        return (
            <div>
                <p>You need to add a dispenser.</p>
                <div className="AddDispenser-container">
                    <AddDispenser displayCodeCallback={this.displayDispenserCode} />
                </div>
            </div>
        );
    }

    displayDispenserCode = () => {
        console.log("Display Dispenser Code. ");
        // ReactGA.event({
        //     category: 'Pop Up Modal', 
        //     action: 'Generated dispenser code from Dashboard', 
        //     label: 'Add Dispenser from Dashboard' 
        // })
        this.setState({
            toggleCodeDisplay: true
        });
    }

    hideDispenserCode = () => {
        this.setState({
            toggleCodeDisplay: false
        });
    }

    render() {
        console.log(this.props);
        const { allPDISurveys,
            surveysLoading,
            surveysLoaded,
            surveyError,
            dispenser,
            dispenserLoading,
            dispenserLoaded,
            dispenserError, } = this.props;

        if (!dispenserLoaded && !this.state.toggleCodeDisplay && !dispenserLoading) {
            return this.addDispenserHTML();
        }

        if (this.state.toggleCodeDisplay) {
            return (
                <div className="DispenserCode-container">
                    <DispenserCode hideDispenserCode={this.hideDispenserCode}
                        userProfile={this.props.patient} />
                </div>
            );
        }
	
	
	if(dispenser && (!dispenser.events || !dispenser.events.dispenses[0])) {
	    return (
		<div>This patient has a dispenser but no dispenser data. </div>
	    );
	}


        if (surveysLoading || dispenserLoading) {
            return (
                <div>
                    <div class="loader"></div>
                    <p class="loading-text">Loading...</p>
                </div>
            );
        }

        var data = {}
        if (allPDISurveys[0] && !surveyError) {
            data = {
                ...data,
                pdisurveys: allPDISurveys,
            }
        }

        if (dispenser) {
            data = {
                ...data,
                events: dispenser.events,
            };
        }

        console.log(data);

        // return (
        //     <div>
        //         Loaded regularly...
        //     </div>
        // );

        return (
            <div className="pd-container">
                <h1 className="header">
                    My Data
                </h1>
                <SummaryStats data={data} />
                <DataView data={data} dispenser={this.props.dispenser} />
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

});

export default connect(mapStateToProps, { fetchPDISurveys, fetchDispenser })(PatientData); 
