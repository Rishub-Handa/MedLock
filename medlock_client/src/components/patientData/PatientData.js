import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions'; 
import { fetchDispenses } from '../../actions/dispenserActions'; 
import { VictoryBar, 
        VictoryChart, 
        VictoryLine, 
        VictoryAxis, 
        VictoryStack, 
        VictoryArea, 
        VictoryScatter } from 'victory'; 
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
        this.props.fetchDispenses(this.props.profile.dispenser_id); 
        console.log("Calling fetchDispenses"); 
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

            // this.state.df.s(null, 'family').p(); 
            
            for(let i = 0; i < this.state.dfSurvey.names().values.length - 2; i++) {
                const values = this.state.dfSurvey.s(null, this.state.dfSurvey.names().values[i])._cols[0].values.map(value => parseInt(value));
                avgs[i] = {
                    question: this.state.dfSurvey.names().values[i], 
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
            // console.log(error); 
            return (<p>Loading . . . </p>); 
        } 
    }

    pdiLinesHTML = (painCategories) => {

        try {

            const df = this.state.dfSurvey; 

            const allCoordinates = painCategories.map(category => {
                // Change null to domain 
                const dataPoints = df.s(null, category)._cols[0].values.map(value => {
                    if(value)
                        return parseInt(value); 
                    return -1; 
                }).map((painData, index) => {
                    return {
                        x: index, 
                        y: painData 
                    }
                })
                // console.log(dataPoints); 
                return dataPoints; 
            }); 

            const labels = df.s(null, "date")._cols[0].values.map(date => date.substring(5, 10)); 

            // console.log(labels); 

            return (
                <div className="pdi-lines"> 
                    <VictoryChart labels={labels}>
                    <VictoryAxis dependentAxis /> 
                    <VictoryAxis tickValues={labels}/> 
                        {allCoordinates.map((lineData, index) => {
                            if(index === 0) {
                                return ( <VictoryLine data={lineData}/> ); 
                            } else { return(<VictoryLine data={lineData}/>); }
                        })}
                    
                    </VictoryChart> 
                </div> 

            )

        } catch(error) {
            // console.log(error); 
            return (<p>Loading . . . </p>)
        } 
    }

    pdiStackedHTML = (painCategories) => {
        try {

            const df = this.state.dfSurvey; 

            if(!painCategories) {
                painCategories = this.state.dfSurvey.names().values.slice(0,7)
            }

            const allCoordinates = painCategories.map(category => {
                // Change null to domain 
                const dataPoints = df.s(null, category)._cols[0].values.map(value => {
                    if(value)
                        return parseInt(value); 
                    return -1; 
                }).map((painData, index) => {
                    return {
                        x: index, 
                        y: painData 
                    }
                })
                // console.log(dataPoints); 
                return dataPoints; 
            }); 

            const labels = df.s(null, "date")._cols[0].values.map(date => date.substring(5, 10)); 

            // console.log(allCoordinates); 

            return (
                <div className="pdi-stacked"> 
                    <VictoryStack>
                        {allCoordinates.map(lineData => {
                            return ( <VictoryArea data={lineData}/> ); 
                        })}
                        <VictoryAxis dependentAxis />
                        <VictoryAxis tickValues={labels}/>
                    </VictoryStack> 
                </div> 

            )

        } catch(error) {
            // console.log(error); 
            return (<p>Loading . . . </p>)
        } 
    } 

    dispenseBarHTML = () => {
        
        try {
            // Change null to Selection Range 
            const df = this.state.dfDispense.s(null, ["date", "time"]); 

            const timeStamps = df.toObjArray().map(row => {
                const year = row.date.substring(6, 8); 
                const month = row.date.substring(0, 2); 
                const day = row.date.substring(3, 5); 
                const hour = row.time.substring(0, 2); 
                const minute = row.time.substring(3, 5); 

                return new Date(parseInt(year), 
                                parseInt(month) - 1, 
                                parseInt(day), 
                                parseInt(hour), 
                                parseInt(minute)); 
            })

            console.log(timeStamps); 

            const timeDifferences = []; 

            for(let i = 0; i < timeStamps.length - 1; i++) {
                timeDifferences[i] = (timeStamps[i+1] - timeStamps[i]) / (60 * 60 * 1000); 
            }
            
            console.log(timeDifferences); 

            return(
                <div className="dispense-bar">
                    <VictoryChart domainPadding={{x: 100}}>
                        <VictoryBar data={timeDifferences} 
                                    barWidth={30} 
                                    alignment="start"/>
                    </VictoryChart>
                </div>
            )
            
            

        } catch(error) {
            console.log(error); 
            return(<p>Loading . . . </p>)
        }

        return (<p>Test. </p>)
    }

    dispenseScatterHTML = () => {

        try {
            const df = this.state.dfDispense; 
            const patientData = df.toObjArray(); 
            console.log(patientData); 

            const coordinates = patientData.map(dataPoint => {
                const middleIndex = parseInt(dataPoint.time.indexOf(':')); 
                const hours = parseInt(dataPoint.time.substring(0, middleIndex)); 
                const minutes = (parseInt(dataPoint.time.substring(middleIndex+1, 5))) / 60; 
                const time = hours + minutes; 
                return ({
                    time: time, 
                    date: parseInt(dataPoint.date.substring(3, 5)) 
                }); 
            })

            console.log(coordinates); 

            return (
                <div className="dispense-scatter">
                    <VictoryChart>
                        <VictoryScatter data={coordinates}
                                        x="time"
                                        y="date"/> 
                    </VictoryChart>
                </div>
            )

        } catch(error) {
            console.log(error); 
            return (<p>Loading . . . </p>)
        }

    }


    loadDataToState = (surveys, dispenses) => {

        try {
            if(surveys[0].responses) {
                // console.log("Responses"); 
            }
            let dfData = surveys.map(survey => {
                // console.log(survey.responses); 
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
            // console.log(dfData); 
            let dfSurvey = jd.dfFromObjArray(dfData).sort("date"); 
            // df.p(); 

            dispenses.dispenses.forEach(dispense => {
                delete dispense._id; 
            })

            // console.log(dispenses.dispenses); 

            let dfDispense = jd.dfFromObjArray(dispenses.dispenses); 
            // console.log(dfDispense); 

            this.setState({
                retrievedData: true, 
                dfSurvey, 
                dfDispense 
            }); 

        } catch(error) {
            // console.log(error); 
        }

        return null; 

    }

    render() {
        
        const { allPDISurveys, 
                surveyLoading, 
                surveyError, 
                dispenses, 
                dispenseLoading, 
                dispenseError } = this.props; 

        if(surveyError || dispenseError) {
            return (
                <div>
                    <div>Survey Error: { surveyError ? surveyError.message : null}</div>
                    <div>Dispense Error: {dispenseError ? dispenseError.message : null}</div>
                </div>
            ); 
        }

        if(surveyLoading || dispenseLoading) {
            return (
                <div>Loading . . . </div>
            )
        } else if(!surveyLoading && !dispenseLoading && !this.state.retrievedData) {
            console.log(dispenses); 
            this.loadDataToState(allPDISurveys, dispenses); 
        }


        
        return (
            <div className="pd-container">
                <div className="pd-body">
                    <h1>My Data</h1>
                    <div>
                        <h3>Averages Data</h3>
                        {this.averagesHTML()} 
                    </div>
                    <div>
                        <h3>Line Graph Data</h3>
                        {this.pdiLinesHTML(['recreation', 'occupation'])} 
                    </div> 
                    <div>
                        <h3>Stacked Graph Data</h3>
                        {this.pdiStackedHTML()} 
                    </div> 
                    <div>
                        <h3>Time Between Doses</h3> 
                        {this.dispenseBarHTML(this.props.dispenses)} 
                    </div>
                    <div>
                        <h3>Dispense Scatter Data</h3>
                        {this.dispenseScatterHTML()} 
                    </div>
                </div>
            </div>
        );
    }
}

PatientData.propTypes = {
    fetchPDISurveys: PropTypes.func.isRequired,
    allPDISurveys: PropTypes.array.isRequired, 
    fetchDispenses: PropTypes.func.isRequired, 
    dispenses: PropTypes.array.isRequired 
}

const mapStateToProps = state => ({
    allPDISurveys: state.surveyState.responses, 
    surveyLoading: state.surveyState.loading,
    surveyError: state.surveyState.error,  
    dispenses: state.dispenseState.dispenses, 
    dispenseLoading: state.dispenseState.loading, 
    dispenseError: state.dispenseState.error 

});

export default connect(mapStateToProps, { fetchPDISurveys, fetchDispenses })(PatientData);

