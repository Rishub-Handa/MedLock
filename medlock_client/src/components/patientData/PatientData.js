import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions';
import { VictoryBar, VictoryChart } from 'victory'; 
import SideBar from '../nav/SideBar'; 
import '../../css/PatientData.css'; 

const jd = require('jsdataframe'); 

/** 
 * Component for displaying individual patient data
 * in the patient portal. 
 */
class PatientData extends Component {

    state = {
        retrievedData: false 
    }

    componentWillMount() {
        this.props.fetchPDISurveys(); 
    }

    surveysHTML = (surveys) => {
        return (
            <div>
                {surveys.map(survey => {
                    return (
                        <div>
                            <h3>Date: {survey.date}</h3>
                            {survey.responses.map(response => {
                                return (
                                    <p>Question: {response.question}; Answer: {response.answer}</p>
                                )
                            })}         
                        </div>
                    )
                })}
            </div>
        )
    }

    averagesHTML = () => {
        try {
            const avgs = []; 

            this.state.df.s(null, 'family').p(); 
            
            for(let i = 0; i < this.state.df.names().values.length - 2; i++) {
                const values = this.state.df.s(null, this.state.df.names().values[i])._cols[0].values.map(value => parseInt(value));
                avgs[i] = {
                    question: this.state.df.names().values[i], 
                    answer: jd.vector(values).mean() 
                }
            }

            // let avgResponses = surveys[0].responses; 
            // console.log(avgResponses); 
            // avgResponses.map(response => {
            //     response.answer = parseInt(response.answer); 
            // })
            // for(let i = 1; i < surveys.length; i++) {
            //     for(let j = 0; j < avgResponses.length; j++) {
            //         avgResponses[j].answer += parseInt(surveys[i].responses[j].answer); 
            //     }
            // }

            // avgResponses.map(response => {
            //     response.answer = response.answer / surveys.length; 
            // })

            // console.log(avgResponses); 
            // console.log(this.state); 

            return (
                <div>
                    <div className="avg-pdi-bar">
                    <VictoryChart padding={{left: 120, top: 20}}>
                            <VictoryBar horizontal 
                                        data={avgs}
                                        x="question"
                                        y="answer"
                                        />
                        </VictoryChart>
                    </div>
                </div>
            ); 
            

        } catch(error) { 
            console.log(error); 
            return (<p>Loading . . . </p>); 
        } 
    }

    pdiLinesHTML = () => {

        return( 
            <p>Line Graph</p>
        )
        
    }



    loadDataToState = (surveys) => {

        try {
            if(surveys[0].responses) {
                console.log("Responses"); 
            }
            let dfData = surveys.map(survey => {
                console.log(survey.responses); 
                let responses = survey.responses.map(response => {
                    return { [response.question]: response.answer} ; 
                })
                responses = [...responses, { date: survey.date }, { _id: survey._id }]; 
                let responseObj = {}; 
                responses.forEach(response => {
                    for(let key in response) {
                        responseObj[key] = response[key]; 
                    }
                })
                return responseObj; 
            }); 
            console.log(dfData); 
            let df = jd.dfFromObjArray(dfData); 
            df.p(); 

            this.setState({retrievedData: true}); 

            return df; 

        } catch(error) {
            console.log(error); 
        }

        return null; 

    }

    render() {
        
        const { allPDISurveys, loading, error } = this.props; 

        if(error) {
            return (
                <div>Error: {error.message}</div>
            )
        }

        if(loading) {
            return (
                <div>Loading . . . </div>
            )
        } else if(!loading && !this.state.retrievedData) {
            this.setState({ df: this.loadDataToState(allPDISurveys) }); 
        }
        
        return (
            <div className="pd-container">
                <SideBar className="pd-sidebar" />
                <div className="pd-body">
                    <h1>My Data</h1>
                    <div>
                        <h3>Averages Data</h3>
                        {this.averagesHTML()} 
                    </div>
                    <div>
                        <h3>Line Graph Data</h3>
                        {this.pdiLinesHTML()} 
                    </div> 
                </div>
            </div>
        );
    }
}

PatientData.propTypes = {
    fetchPDISurveys: PropTypes.func.isRequired,
    allPDISurveys: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    allPDISurveys: state.surveyState.responses, 
    loading: state.surveyState.loading, 
    error: state.surveyState.error 
});

export default connect(mapStateToProps, { fetchPDISurveys })(PatientData);

