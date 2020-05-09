import React, { Component } from 'react'; 
import MultChoice from './QuestionTypes/MultChoice'; 

class ExitSurvey extends Component {

    state = {
        responses: [], 
        questions: [] 
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

        // console.log(this.state); 

        
    }






    render() {
        return (
            <div>
                <MultChoice question={this.question} 
                                        responses={this.responses} 
                                        id={0} 
                                        other={false} 
                                        onChange={this.onChange} 
                                        agreeType={true}/> 
            </div>
        )
    }
}

const question = "How do you rate your pain?"; 
const responses = ["Not much", "A little", "A lot"]; 


export default ExitSurvey; 