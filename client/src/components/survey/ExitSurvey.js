import React, { Component } from 'react'; 
import MultChoice from './QuestionTypes/MultChoice'; 
import MultSelect from './QuestionTypes/MultSelect'; 
import TextInput from './QuestionTypes/TextInput'; 
import NumInput from './QuestionTypes/NumInput'; 
import TextDirections from './QuestionTypes/TextDirections'
import { connect } from 'react-redux'; 
import { submitExitSurvey } from '../../actions/surveyActions'; 
const surveyJSON = require('./SurveyBank/ExitQs.json'); 

class ExitSurvey extends Component {

    state = {
        responses: [], 
        questions: [] 
    }

    componentDidMount() {
        console.log("Exit Survey"); 
        console.log(surveyJSON); 
        console.log(surveyJSON[0]); 
        this.setState({ questions: surveyJSON }); 
    } 

    submitResponses = () => {
        let answeredAll = true; 
        if(this.state.responses.length != this.state.questions.length) answeredAll = false; 
        this.state.responses.forEach((response, i) => {
            if((!response || !response.answer || response.answer == "") && (this.state.questions[i].type != "TD")) {
                answeredAll = false; 
                console.log(response); 
            }
            console.log(i); 
            if(this.state.questions[i].type == "NI" && 
                response && 
                (response.answer < this.state.questions[i].min || response.answer > this.state.questions[i].max)) {
                    answeredAll = false; 
                }
        })

        if(answeredAll) {
            console.log("Submit. "); 
            this.props.submitExitSurvey(this.state.responses); 
        } else {
            // IMPLEMENT: Make an alert 
            console.log("Respond to all the questions. "); 
        }
    }

    onChange = (id, name, value) => {
        let newResponses = [...this.state.responses]; 
        newResponses[id] = {
            question: name, 
            answer: value 
        }

        this.setState({
            responses: newResponses 
        }); 
    } 

    questionsHTML = () => (
        <div> 
            {
                this.state.questions.map(question => {
                    if(question.type == "MC") {
                        return (
                            <MultChoice question={question.question} 
                                        responses={question.responses} 
                                        id={question.id} 
                                        other={question.other} 
                                        onChange={this.onChange} /> 
                        ); 
                    } else if(question.type == "MS") {
                        return (
                            <MultSelect question={question.question} 
                                        responses={question.responses} 
                                        id={question.id} 
                                        other={question.other} 
                                        onChange={this.onChange} /> 
                        ); 
                    } else if(question.type == "TI") {
                        return (
                            <TextInput question={question.question} id={question.id} onChange={this.onChange} /> 
                        ); 
                    } else if(question.type == "NI") {
                        return (
                            <NumInput question={question.question} 
                                        min={question.min} 
                                        max={question.max} 
                                        id={question.id} 
                                        onChange={this.onChange} /> 
                        ); 
                    } else if(question.type == "TD") {
                        return (
                            <TextDirections question={question.question} 
                                                id={question.id} /> 
                        ); 
                    }
                }) 
            }
        </div> 
    ); 


    render() {

        // IMPLEMENT: surveyResponse, loading, and error 

        const { surveyResponse, loading, error } = this.props; 

        if(loading) {
            console.log(loading); 
            return (
                <div> 
                    <p>Sending . . . </p>
                </div>
            )
        } 

        if(error) {
            console.log(error); 
            return (
                <div>
                    <p>There was an error in submitting the survey; please try again. </p>
                </div>
            )
        } 

        if(surveyResponse) {
            console.log(surveyResponse); 
            return (
                <div> 
                    <p>Your responses were submitted. Thank you </p>
                </div>
            )
        }

        return (
            <div class="survey-container">
                <h1 class="header">Exit Survey</h1>
                {this.state.questions ? this.questionsHTML() : (
                    <div>
                    <div class="loader"></div>
                    <p class="loading-text">Loading...</p>
                </div>
                )} 
                <button class="create-new-btn" onClick={this.submitResponses}>Submit</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    surveyResponse: state.surveyState.ExitSurveyResponse, 
    loading: state.surveyState.ExitSurveyLoading, 
    error: state.surveyState.ExitSurveyError 
});

export default connect(mapStateToProps, { submitExitSurvey })(ExitSurvey); 