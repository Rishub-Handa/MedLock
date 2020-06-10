import React, { Component } from 'react';

class CheckIn extends Component {

    state = {
        responses: [
            {
                id: 0,
                question: "Has the patient relapsed since you last saw them? If so, when? ",
                responses: ["Yes", "No", "N/A"],
                answer: null,
            },
            {
                id: 1,
                question: "What were the Urine Drug Screen results? If they were positive, please indicate which substances were found. ",
                responses: ["Positive", "Negative", "N/A"],
                answer: null,
            },
        ]
    }

    onChange = (e) => {
        console.log(e);

        if (e.target.type == "radio") {
            let newResponses = this.state.responses;
            newResponses[e.target.id].answer = e.target.value;
            this.setState({ responses: newResponses });
            newResponses[e.target.id].textResponse = "";
        }

        if (e.target.type == "text") {
            let newResponses = this.state.responses;
            newResponses[e.target.id].textResponse = e.target.value;
            this.setState({ responses: newResponses });
        }

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.state.responses.map(response => {
            if ((response.answer == "Yes" || response.answer == "Positive") && response.textResponse != "") {
                let newResponses = this.state.responses;
                newResponses[response.id].answer = response.textResponse;
            }
        });

        this.props.submitData(this.state.responses);
    }



    questionsHTML = () => {

        return (
            <div>
                <form onChange={this.onChange}>
                    {this.state.responses.map(response => (
                        <div>
                            <p>{response.question}
                                {response.responses.map(responseChoice => (
                                    <p style={{marginBottom: "5px"}}><input name={response.question} id={response.id} type="radio" value={responseChoice} />{responseChoice}
                                        {
                                            // TEST 
                                            ((responseChoice == "Yes" &&
                                                this.state.responses[response.id].answer == "Yes") ||
                                                (responseChoice == "Positive" &&
                                                    this.state.responses[response.id].answer == "Positive")) &&
                                            <input style={{marginLeft: "8px"}}name={response.question} id={response.id} type="text" />
                                        }</p>
                                ))}
                            </p>
                        </div>
                    ))}
                    <button className="create-new-btn" type="submit" onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div className="checkIn-container">
                <h6>Check In. </h6>
                {this.questionsHTML()}
            </div>
        )
    }
}


export default CheckIn; 