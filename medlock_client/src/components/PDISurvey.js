import React, { Component } from 'react'; 
import '../css/PDISurvey.css'; 

// Assuming that each type of survey would have different representation. 

class Survey extends Component { 

    // I know that this is inefficient to store it in the state. The reason for doing 
    // so is that in the MongoDB Schema, there will be these fields 


    state = {
        currentQuestion: 0, 
        currentResponse: 5, 
        questions: [
            {
                instructions: 'This survey evaluates how pain disrupts your daily life. ', 
                prompt: 'How is your pain affecting your ', 
                madlibs: 'family', 
                description: 'This category refers to activities of the home or family. It includes chores or duties performed around the house (e.g. yard work) and errands or favors for other family members (e.g. driving the children to school).', 
                responseType: 'integer', 
                response: null 
            }, 
            {
                instructions: 'This survey evaluates how pain disrupts your daily life. ', 
                prompt: 'How is your pain affecting your ', 
                madlibs: 'recreation', 
                description: ' This category includes hobbies, sports, and other similar leisure time activities.', 
                responseType: 'integer', 
                response: null 
            }, 
            {
                instructions: 'This survey evaluates how pain disrupts your daily life. ', 
                prompt: 'How is pain affecting your ', 
                madlibs: 'social activity', 
                description: 'This category refers to activities, which involve participation with friends and acquaintances other than family members. It includes parties, theater, concerts, dining out, and other social functions.', 
                responseType: 'integer', 
                response: null 
            }, 
            {
                instructions: 'This survey evaluates how pain disrupts your daily life. ', 
                prompt: 'How is pain affecting your ', 
                madlibs: 'occupation', 
                description: 'This category refers to activities that are part of or directly related to one’s job. This includes non-paying jobs as well, such as that of a housewife or volunteer.', 
                responseType: 'integer', 
                response: null 
            }, 
            {
                instructions: 'This survey evaluates how pain disrupts your daily life. ', 
                prompt: 'How is pain affecting your ', 
                madlibs: 'sexual behavior', 
                description: 'This category refers to the frequency and quality of one’s sex life.', 
                responseType: 'integer', 
                response: null 
            }, 
            {
                instructions: 'This survey evaluates how pain disrupts your daily life. ', 
                prompt: 'How is pain affecting your ', 
                madlibs: 'self care', 
                description: 'This category includes activities, which involve personal maintenance and independent daily living (e.g. taking a shower, driving, getting dressed, etc.)', 
                responseType: 'integer', 
                response: null 
            }, 
            {
                instructions: 'This survey evaluates how pain disrupts your daily life. ', 
                prompt: 'How is pain affecting your ', 
                madlibs: 'life-support activities', 
                description: 'This category refers to basic life supporting behaviors such as eating, sleeping, and breathing. ', 
                responseType: 'integer', 
                response: null 
            }
        ]
    }

    next = () => {
        console.log(this.state);

        if(this.state.currentQuestion < 6) {
            console.log(this.state.currentQuestion);

            let newQuestions = [...this.state.questions]; 
            newQuestions[this.state.currentQuestion].response = this.state.currentResponse; 

            this.setState(prevState => ({
                questions: newQuestions, 
                // questions: {
                //     ...prevState.questions, 
                //     [prevState.questions[prevState.currentQuestion].response]: prevState.currentResponse 
                // }, 
                currentQuestion: prevState.currentQuestion + 1, 
            }))

            if(!this.state.questions[this.state.currentQuestion].response) {
                console.log("Setting Automated Values"); 
                console.log(this.state.questions[this.state.currentQuestion].response); 

                let newQuestions = [...this.state.questions]; 
                newQuestions[this.state.currentQuestion].response = 5; 

                this.setState(prevState => ({
                    questions: newQuestions 
                    // questions: {
                    //     ...prevState.questions, 
                    //     [prevState.questions[prevState.currentQuestion].response]: 5 
                    // }
                }))
            } else {
                console.log("Setting Response Values"); 
                this.setResponseValues(this.state.questions[this.state.currentQuestion].response); 
            }
        } else return; 
    }

    previous = () => {

        if(this.state.currentQuestion > 0) {

            let newQuestions = [...this.state.questions]; 
            newQuestions[this.state.currentQuestion].response = this.state.currentResponse; 

            this.setState(prevState => ({
                questions: newQuestions, 
                // questions: {
                //     ...prevState.questions, 
                //     [prevState.questions[prevState.currentQuestion].response]: prevState.currentResponse 
                // }, 
                currentQuestion: prevState.currentQuestion - 1, 
            }))

            if(!this.state.questions[this.state.currentQuestion].response) {
                console.log("Setting Automated Values"); 
                console.log(this.state.questions[this.state.currentQuestion].response);
                
                let newQuestions = [...this.state.questions]; 
                newQuestions[this.state.currentQuestion].response = 5; 
                this.setState(prevState => ({
                    questions: newQuestions 
                    // questions: {
                    //     ...prevState.questions, 
                    //     [prevState.questions[prevState.currentQuestion].response]: 5 
                    // }
                }))
            } else { 
                console.log("Setting Response Values");
                this.setResponseValues(this.state.questions[this.state.currentQuestion].response); 
            }
        }
    }

    setResponseValues = (middleValue) => {
        let items = document.querySelectorAll('.survey-response-item'); 
        let counter = -2; 
        items.forEach(item => {
            if((middleValue + counter) > 0 && (middleValue + counter) < 10) {
                item.innerHTML = "" + (middleValue + counter); 
            } else {
                item.innerHTML = ""; 
            }
            counter += 1; 
        })
    }

    plus = () => {
        let items = document.querySelectorAll('.survey-response-item'); 
        if(items[items.length - 2].innerHTML !== "") {
            items.forEach(item => {
                if(parseInt(item.innerHTML) < 10) {
                    item.innerHTML = "" + (parseInt(item.innerHTML) + 1);
                } else {
                    item.innerHTML = ""; 
                
                }
            }); 
            
            if(items[1].innerHTML === "") {
                items[1].innerHTML = "1"; 
            } else if(items[0].innerHTML === "") {
                items[0].innerHTML = "1"; 
            }
        }

        if(this.state.currentResponse < 10) {
            this.setState(prevState => ({
                currentResponse: prevState.currentResponse + 1 
            })); 
        }

    }

    minus = () => {
        let items = document.querySelectorAll('.survey-response-item'); 
        if(items[1].innerHTML !== "") {
            items.forEach(item => {
                if(parseInt(item.innerHTML) > 1) {
                    item.innerHTML = "" + (parseInt(item.innerHTML) - 1);
                } else {
                    item.innerHTML = ""; 
                }
            }); 
        }

        if(items[items.length - 2].innerHTML === "") {
            items[items.length - 2].innerHTML = "10"; 
        } else if(items[items.length - 1].innerHTML === "") {
            items[items.length - 1].innerHTML = "10"; 
        }

        if(this.state.currentResponse > 1) {
            this.setState(prevState => ({
                currentResponse: prevState.currentResponse - 1 
            })); 
        }
    }

    render() { 

        return (
            <div>
                <div className="survey-container">
                    <p>This survey evaluates how pain disrupts your daily life. </p>
                    <h2 className="survey-question">How is your pain affecting your </h2>
                    <h1 className="survey-madlibs">{this.state.questions[this.state.currentQuestion].madlibs}</h1>
                    <div className="survey-response">
                        <h6 className="survey-response-item">3</h6>
                        <h3 className="survey-response-item">4</h3>
                        <h1 className="survey-response-item">5</h1>
                        <h3 className="survey-response-item">6</h3>
                        <h6 className="survey-response-item">7</h6>
                    </div>
                    <div className="answer-adjust"> 
                        <button onClick={this.minus} className="minus">-</button> 
                        <button onClick={this.plus} className="plus">+</button>
                    </div>
                    <div className="survey-navigation">
                        <button onClick={this.next} className="next-btn">Next</button>
                        <button onClick={this.previous} className="prev-btn">Previous</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Survey; 