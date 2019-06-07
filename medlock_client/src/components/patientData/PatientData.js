import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllSurveys } from '../../actions/surveyActions';

/** 
 * Component for displaying individual patient data
 * in the patient portal. 
 */
class PatientData extends Component {
    UNSAFE_componentWillMount() {
        this.props.fetchAllSurveys();
    }

    surveyHTML = allSurveys => {
        return allSurveys.map(survey => (
            <div>
                <h4>Date: {survey.date}</h4>
                {
                    survey.responses.map(response => (
                        <div>
                            <h6>Question: {response.question}</h6>
                            <h6>Answer: {response.answer}</h6>
                        </div>
                    ))
                }
            </div>
            
        ));
    }

    render() {
        return (
            <div>
                <h1>My Data</h1>
                <div>
                    <h2>Survey Responses</h2>
                    {this.surveyHTML(this.props.allSurveys)}
                </div>
            </div>
        );
    }
}

PatientData.propTypes = {
    fetchAllSurveys: PropTypes.func.isRequired,
    allSurveys: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    allSurveys: state.surveyState.allSurveys
});

export default connect(mapStateToProps, { fetchAllSurveys })(PatientData);

