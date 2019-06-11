import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions';
import SideBar from '../nav/SideBar'; 
import '../../css/PatientData.css'; 

/** 
 * Component for displaying individual patient data
 * in the patient portal. 
 */
class PatientData extends Component {

    componentWillMount() {
        this.props.fetchPDISurveys(); 
    }

    surveysHTML = (surveys) => {
        return (
            <div>
                {surveys.map(survey => {
                    return (
                        <div>
                            <h3>Date: {survey.date}</h3>
                            {survey.responses.map(response => {
                                return (
                                    <p>Question: {response.question}; Answer: {response.answer}</p>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

    averagesHTML = (surveys) => {
        // let avgResponses = surveys[0].responses;
        console.log(this.props.allPDISurveys);  
        let avgResponses = this.props.allPDISurveys[0]; 
        

        
        return (<p>Surveys</p>); 
    }

    render() {
        
        const { allPDISurveys, loading, error } = this.props; 

        if(error) {
            return (
                <div>Error: {error.message}</div>
            )
        }

        if(loading) {
            return (
                <div>Loading . . . </div>
            )
        }
        
        return (
            <div className="pd-container">
                <SideBar className="pd-sidebar" />
                <div className="pd-body">
                    <h1>My Data</h1>
                    <div>
                        <h2>Survey Responses</h2>
                        {this.surveysHTML(allPDISurveys)} 
                    </div>
                    <div>
                        <h3>Averages Data</h3>
                        {this.averagesHTML(allPDISurveys)} 
                    </div>
                </div>
            </div>
        );
    }
}

PatientData.propTypes = {
    fetchPDISurveys: PropTypes.func.isRequired,
    allPDISurveys: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    allPDISurveys: state.surveyState.responses, 
    loading: state.surveyState.loading, 
    error: state.surveyState.error 
});

export default connect(mapStateToProps, { fetchPDISurveys })(PatientData);

