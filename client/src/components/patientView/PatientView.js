import React, { Component } from 'react';
import PersonalDataView from './PersonalDataView';
import { connect } from 'react-redux';
import { fetchDispenser, updateButtonMeaning } from '../../actions/dispenserActions';  
import DataView from '../patientData/DataView';
import SummaryStats from '../patientData/SummaryStats';
import PropTypes from 'prop-types';
import '../../css/PatientView.css';
import CheckIn from './CheckIn'; 
import { addCheckIn } from '../../actions/patientActions'; 
import RawDataDisp from './RawDataDisp'; 
import DispenserInfo from './DispenserInfo';

class PatientView extends Component {

    constructor(props) {
        console.log(props);
        super(props);
    }

    state = {
        showCheckIn: false 
    }

    submitCheckIn = (checkInResponses) => {
        this.setState({ showCheckIn: false }); 

        let checkInBody = {
            responses: checkInResponses, 
            patientId: this.props.patient._id
        } 
        this.props.addCheckIn(checkInBody); 

    }

    componentDidMount() {
        this.props.fetchDispenser(this.props.patient.medicalData.dispenser_id); 
    }

    render() {
        const { patient,
                dispenser, 
                dispenserLoading, 
                dispenserLoaded,
                dispenserError, 
                checkInData, 
                checkInLoading, 
                checkInError } = this.props; 

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
                events: dispenser.events
            }
        }

        console.log(data);
        return (
            <div className="patientView-container">
                <PersonalDataView personalData={patient.personalData} />
                {!checkInData && !checkInLoading && !checkInError && !this.state.showCheckIn && 
                    <button className="create-new-btn" onClick={() => { this.setState({ showCheckIn: true }); }}>Add Check In</button>} 
                {!checkInData && !checkInLoading && !checkInError && this.state.showCheckIn && 
                    <CheckIn submitData={this.submitCheckIn}/>}
                {checkInLoading && <p>Loading . . .</p>}
                {checkInError && <div className="error-box"><p>There was an error in sending the data. </p></div>}
                {checkInData && <div className="confirmation-box"><p><span>✔</span> Thank you, the data has been saved. </p></div>}
                <SummaryStats data={data} />
                <DispenserInfo updateButtonMeaning={this.props.updateButtonMeaning} dispenser={this.props.dispenser} />
                <DataView data={data} dispenser={this.props.dispenser} />
                <RawDataDisp patient={this.props.patient} rawData={dispenser.events}/> 
            </div>
        );
    }
}

PatientView.propTypes = {
    fetchDispenser: PropTypes.func.isRequired, 
    updateButtonMeaning: PropTypes.func.isRequired,
    dispenser: PropTypes.object.isRequired,
    dispenserLoading: PropTypes.bool.isRequired,
    dispenserLoaded: PropTypes.bool.isRequired,
    dispenserError: PropTypes.object
}

const mapStateToProps = state => ({
    dispenser: state.dispenseState.dispenser, 
    dispenserLoading: state.dispenseState.dispenserLoading,
    dispenserLoaded: state.dispenseState.dispenserLoaded,
    dispenserError: state.dispenseState.error, 
    checkInData: state.patientState.checkInData,
    checkInLoading: state.patientState.checkInLoading, 
    checkInError: state.patientState.checkInError 
})

export default connect(mapStateToProps, { 
    fetchDispenser, 
    updateButtonMeaning, 
    addCheckIn })(PatientView);
