import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { submitSurvey } from '../actions/surveyActions'; 

class PDISurvey extends Component { 

    state = {
    }

    // State contains the value of the updated UI Element. 
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    // Submit the UI Element values in the local state to the action. 
    onSubmit = (e) => {
        e.preventDefault(); 

        const response = {
            ...this.state 
        }
        console.log(response);
        this.props.submitSurvey(response); 
    }

    render() {
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
                                            onChange={this.onChange}/>
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
        subject: 'family', 
        description: 'This category refers to activities of the home or family. It includes chores or duties performed around the house (e.g. yard work) and errands or favors for other family members (e.g. driving the children to school).'
    }, 
    {
        subject: 'recreation', 
        description: 'This disability includes hobbies, sports, and other similar leisure time activities.' 
    }, 
    {
        subject: 'social activity', 
        description: 'This category refers to activities, which involve participation with friends and acquaintances other than family members. It includes parties, theater, concerts, dining out, and other social functions.'
    }, 
    {
        subject: 'occupation', 
        description: 'This category refers to activities that are part of or directly related to one’s job. This includes non-paying jobs as well, such as that of a housewife or volunteer.'
    }, 
    {
        subject: 'sexual behavior', 
        description: 'This category refers to the frequency and quality of one’s sex life.'
    }, 
    {
        subject: 'self care', 
        description: 'This category includes activities, which involve personal maintenance and independent daily living (e.g. taking a shower, driving, getting dressed, etc.)'
    }, 
    {
        subject: 'life support activities', 
        description: 'This category refers to basic life supporting behaviors such as eating, sleeping and breathing.'
    }
]; 

export default connect(null, { submitSurvey })(PDISurvey); 
