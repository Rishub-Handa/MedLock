import React, { Component } from 'react'; 
import MultChoice from './QuestionTypes/MultChoice'; 
import MultSelect from './QuestionTypes/MultSelect'; 
import TextInput from './QuestionTypes/TextInput'; 
import NumInput from './QuestionTypes/NumInput'; 
import TextDirections from './QuestionTypes/TextDirections'
import { connect } from 'react-redux'; 
// IMPLEMENT: Change JSON file 
const surveyJSON = require('./SurveyBank/Intake.json'); 

// TODO: 
// Test dispatch action and communication with backend 
// Test data format to backend 
// Write server endpoint 

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
        console.log(this.state); 
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

        return (
            <div class="survey-container">
                <h1 class="header">Exit Survey</h1>
                {this.state.questions ? this.questionsHTML() : (
                    <p>Loading . . . </p>
                )} 
                <button class="create-new-btn" onClick={this.submitResponses}>Submit</button>
            </div>
        )
    }
}


export default ExitSurvey; 