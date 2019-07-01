import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPDISurveys } from '../../actions/surveyActions'; 
import { fetchDispenses } from '../../actions/dispenserActions'; 
import { 
    VictoryBar, 
    VictoryChart, 
    VictoryLine, 
    VictoryAxis, 
    VictoryStack, 
    VictoryArea, 
    VictoryScatter, 
    VictoryTheme,
    VictoryContainer
} from 'victory'; 
import AveragePDISurvey from '../graphs/AveragePDISurvey';
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

    // Fetch Surveys and Dispenses data from database 
    componentWillMount() {
        this.props.fetchPDISurveys(); 
        console.log(this.props.profile);
        this.props.fetchDispenses(this.props.profile.medicalData.dispenser_id); 
        console.log("Calling fetchDispenses"); 
    }

    // Display all PDI Survey data 
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

    // Display bar chart of average PDI Survey values 
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

            console.log(avgs);

            return (
                <div className="avg-pdi-bar">
                    <VictoryChart 
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        padding={{left: 120, top: 20}}
                    >
                        <VictoryBar 
                            horizontal 
                            data={avgs} 
                            x="question" 
                            y="answer"
                            containerComponent={<VictoryContainer responsive={true} />} 
                        
                        />
                    </VictoryChart>
                </div>
            ); 
            

        } catch(error) { 
            // console.log(error); 
            return (<p>Loading . . . </p>); 
        } 
    }

    // Display line graph for PDI Survey values 
    pdiLinesHTML = (painCategories) => {

        try {

            const df = this.state.dfSurvey; 
            
            if(!painCategories) {
                console.log("Creating Categories. "); 
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
                        x: index + 1, 
                        y: painData 
                    }
                })
                console.log(dataPoints); 
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

    // Display stacked line graph for PDI Survey values 
    pdiStackedHTML = (painCategories) => {
        try {

            const df = this.state.dfSurvey; 
            console.log(df); 

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
                    console.log(index); 
                    return {
                        x: index + 1, 
                        y: painData 
                    }
                })
                console.log(dataPoints); 
                return dataPoints; 
            }); 

            const labels = df.s(null, "date")._cols[0].values.map(date => date.substring(5, 10)); 

            console.log(allCoordinates);

            return (
                <div className="pdi-stacked"> 
                    <VictoryStack> 
                        {allCoordinates.map(coordinateData => {
                            return (
                                <VictoryArea data={coordinateData} />
                            ); 
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

    // Display bar chart of time between doses 
    dispenseBarHTML = () => {
        
        try {
            // Change null to Selection Range 
            const df = this.state.dfDispense; 
            // df.p(); 

            const timeStamps = df.toArray().map(time => new Date(time)); 

            console.log(timeStamps); 

            const timeDifferences = []; 

            for(let i = 0; i < timeStamps.length - 1; i++) {
                timeDifferences[i] = (timeStamps[i+1] - timeStamps[i]) / (60 * 60 * 1000); 
            }
            
            // console.log(timeDifferences); 

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

    // Display scatter chart of dispenses 
    dispenseScatterHTML = () => {

        try {
            const df = this.state.dfDispense; 
            const patientData = df.toArray(); 
            // console.log(patientData); 

            const dates = patientData.map(timestamp => new Date(timestamp)); 

            const coordinates = dates.map((date, index) => {

                const time = date.getHours() + (date.getMinutes() / 60); 
                const dispenseDate = (date.getMonth() + 1) + "-" + date.getDate(); 
                console.log(dispenseDate); 

                // const middleIndex = parseInt(dataPoint.time.indexOf(':')); 
                // const hours = parseInt(dataPoint.time.substring(0, middleIndex)); 
                // const minutes = (parseInt(dataPoint.time.substring(middleIndex+1, 5))) / 60; 
                // const time = hours + minutes; 
                return ({
                    time, 
                    dispenseDate 
                }); 
            })

            // console.log(coordinates); 

            return (
                <div className="dispense-scatter">
                    <VictoryChart>
                        <VictoryScatter data={coordinates}
                                        x="dispenseDate"
                                        y="time"/> 
                    </VictoryChart>
                </div>
            )

        } catch(error) {
            console.log(error); 
            return (<p>Loading . . . </p>)
        }

    }

    // Load the fetched data to the state in a DataFrame 
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

            let dfSurvey = jd.dfFromObjArray(dfData).sort("date"); 

            dispenses.dispenses.forEach(dispense => {
                delete dispense._id; 
            });

            let dfDispense = jd.vector(dispenses.dispenses).sort(); 

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
        console.log(this.props.dispenses);
        console.log(this.props.allPDISurveys);
        
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
                        {this.pdiLinesHTML()} 
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

