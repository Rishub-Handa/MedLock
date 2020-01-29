import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPDISurvey } from '../../actions/surveyActions';
import PropTypes from 'prop-types';

class PDISurvey extends Component {

    state = {
        responses: [],
    };

    // State contains the value of the updated UI Element. 
    onChange = (e) => {

        let newResponses = [...this.state.responses];
        newResponses[e.target.id] = {
            question: e.target.name,
            answer: e.target.value
        }

        this.setState({
            responses: newResponses
        });
    }

    // Submit the UI Element values in the local state to the action. 
    onSubmit = (e) => {
        e.preventDefault();

        const responses = [
            ...this.state.responses
        ]

        console.log(responses);
        this.props.submitPDISurvey(responses);
    }

    render() {
        const { surveyResponse, loading, error } = this.props;

        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        }

        if (loading) {
            return (
                <div>Loading . . .</div>
            )
        }

        if (surveyResponse) {
            return (
                <div>Your response has been recorded. Thank you.</div>
            )
        }


        return (
            <div class="survey-container">
                <h1 class="header">Pain Disability Survey </h1>
                <div class="description">
                    <p> The following survey will ask how much pain is preventing you from doing what you normally do.
                        <br/>A score of <b>0</b> means <b>no disruption.</b>
                        <br/>A score of <b>10</b> means <b>total prevention.</b>
                        <br/>Leave the question blank if it is not applicable.
                    </p>
                </div>
                <form onSubmit={this.onSubmit}>
                    {
                        questions.map(question => {
                            return (
                                <div>
                                    <h3 class="header">How does pain affect your {question.subject}?</h3>
                                    <p class="question-description">{question.description}</p>
                                    <input style={{marginBottom: "10px"}} type="number"
                                        name={question.subject}
                                        onChange={this.onChange}
                                        id={question.id} />
                                </div>

                            );
                        })
                    }
                    <button type="submit" style={{ marginTop: '20px' }}>Submit</button>
                </form>

            </div>
        )
    }
}

// Change to pull from database. 
const questions = [
    {
        id: 0,
        subject: 'family',
        description: 'This category refers to activities of the home or family. It includes chores or duties performed around the house (e.g. yard work) and errands or favors for other family members (e.g. driving the children to school).'
    },
    {
        id: 1,
        subject: 'recreation',
        description: 'This disability includes hobbies, sports, and other similar leisure time activities.'
    },
    {
        id: 2,
        subject: 'social activity',
        description: 'This category refers to activities, which involve participation with friends and acquaintances other than family members. It includes parties, theater, concerts, dining out, and other social functions.'
    },
    {
        id: 3,
        subject: 'occupation',
        description: 'This category refers to activities that are part of or directly related to one’s job. This includes non-paying jobs as well, such as that of a housewife or volunteer.'
    },
    {
        id: 4,
        subject: 'sexual behavior',
        description: 'This category refers to the frequency and quality of one’s sex life.'
    },
    {
        id: 5,
        subject: 'self care',
        description: 'This category includes activities, which involve personal maintenance and independent daily living (e.g. taking a shower, driving, getting dressed, etc.)'
    },
    {
        id: 6,
        subject: 'life support activities',
        description: 'This category refers to basic life supporting behaviors such as eating, sleeping and breathing.'
    }
];

PDISurvey.propTypes = {
    submitSurvey: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    surveyResponse: state.surveyState.PDISurveyResponse,
    loading: state.surveyState.PDILoading,
    error: state.surveyState.PDIError
});

export default connect(mapStateToProps, { submitPDISurvey })(PDISurvey); 
