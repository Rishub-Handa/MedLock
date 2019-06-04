import React, { Component } from 'react'; 
import '../css/Survey.css'; 

class Survey extends Component {
    render() {
        return (
            <div>
                <div className="survey-container">
                    <p>This survey evaluates how pain disrupts your daily life. </p>
                    <h2 className="survey-question">How is your pain affecting your </h2>
                    <h1 className="survey-madlibs">FAMILY</h1>
                    <div className="survey-response">
                        <h6>3</h6>
                        <h3>4</h3>
                        <h1>5</h1>
                        <h3>6</h3>
                        <h6>7</h6>
                    </div>
                    <div className="answer-adjust"> 
                        <button className="minus">-</button> 
                        <button className="plus">+</button>
                    </div>
                    <div className="survey-navigation">
                        <button className="next-btn">Next</button>
                        <button className="prev-btn">Previous</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Survey; 