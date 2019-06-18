import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { submitSurvey } from '../../actions/surveyActions'; 
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
        this.props.submitSurvey(responses); 
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
            <div style={{marginBottom: '50px', marginLeft: '20px'}}>
                <h1>Pain Disability Survey </h1>
                <p>This survey evaluates how much pain affects various aspects of your life. </p>
                <p>A score of 0 indicates that pain does not affect this aspect of your life. </p> 
                <p>A score of 10 indicates that the pain severly affects this aspect of your life negatively. </p>
                <p>Leave the question blank if it is not applicable. </p>
                <form onSubmit={this.onSubmit}>
                    {
                        questions.map(question => {
                            return (
                                <div>
                                    <h3>How does pain affect your {question.subject}?</h3>   
                                    <p>{question.description}</p> 
                                    <input type="number" 
                                            name={question.subject}
                                            onChange={this.onChange}
                                            id={question.id}/>
                                </div>

                            ); 
                        })
                    }
                    <button type="submit" style={{marginTop: '20px'}}>Submit</button>
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
    surveyResponse: state.surveyState.surveyResponse,
    loading: state.surveyState.loading, 
    error: state.surveyState.error 
});

export default connect(mapStateToProps, { submitSurvey })(PDISurvey); 
