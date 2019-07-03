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
import PDISurveyLineGraph from '../graphs/PDISurveyLineGraph';
import PDISurveyStack from '../graphs/PDISurveyStack';
import DispenseScatterData from '../graphs/DispenseScatterData';
import PDISurveyPie from '../graphs/PDISurveyPie';

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
        console.log("Fetching");
        this.props.fetchPDISurveys(); 
        this.props.fetchDispenses(this.props.profile.medicalData.dispenser_id); 
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
        console.log(this.props.allPDISurveys);
        return (
            <AveragePDISurvey data={this.props.allPDISurveys} />
        )
    }

    // Display line graph for PDI Survey values 
    pdiLinesHTML = (painCategories) => {
        return (
            <PDISurveyLineGraph data={this.props.allPDISurveys} />
        )
    }

    // Display stacked line graph for PDI Survey values 
    pdiStackedHTML = (painCategories) => {
        return (
            <PDISurveyStack data={this.props.allPDISurveys} />
        )
    } 

    // // Display bar chart of time between doses 
    // dispenseBarHTML = () => {
        
    //     try {
    //         // Change null to Selection Range 
    //         const df = this.state.dfDispense; 
    //         // df.p(); 

    //         const timeStamps = df.toArray().map(time => new Date(time)); 

    //         console.log(timeStamps); 

    //         const timeDifferences = []; 

    //         for(let i = 0; i < timeStamps.length - 1; i++) {
    //             timeDifferences[i] = (timeStamps[i+1] - timeStamps[i]) / (60 * 60 * 1000); 
    //         }
            
    //         // console.log(timeDifferences); 

    //         return(
    //             <div className="dispense-bar">
    //                 <VictoryChart domainPadding={{x: 100}}>
    //                     <VictoryBar data={timeDifferences} 
    //                                 barWidth={30} 
    //                                 alignment="start"/>
    //                 </VictoryChart>
    //             </div>
    //         )
            
            

    //     } catch(error) {
    //         console.log(error); 
    //         return(<p>Loading . . . </p>)
    //     }

    //     return (<p>Test. </p>)
    // }

    // Display scatter chart of dispenses 
    dispenseScatterHTML = () => {
        return (
            <DispenseScatterData data={this.props.dispenses} />
        )
    }

    // // Load the fetched data to the state in a DataFrame 
    // loadDataToState = (surveys, dispenses) => {

    //     try {
    //         if(surveys[0].responses) {
    //             // console.log("Responses"); 
    //         }
    //         let dfData = surveys.map(survey => {
    //             // console.log(survey.responses); 
    //             let responses = survey.responses.map(response => {
    //                 return { [response.question]: response.answer} ; 
    //             })
    //             responses = [...responses, { date: survey.date }, { _id: survey._id }]; 
    //             let responseObj = {}; 
    //             responses.forEach(response => {
    //                 for(let key in response) {
    //                     responseObj[key] = response[key]; 
    //                 }
    //             })
    //             return responseObj; 
    //         }); 

    //         let dfSurvey = jd.dfFromObjArray(dfData).sort("date"); 

    //         dispenses.dispenses.forEach(dispense => {
    //             delete dispense._id; 
    //         });

    //         let dfDispense = jd.vector(dispenses.dispenses).sort(); 

    //         this.setState({
    //             retrievedData: true, 
    //             dfSurvey, 
    //             dfDispense 
    //         }); 

    //     } catch(error) {
    //         // console.log(error); 
    //     }

    //     return null; 
    // }

    render() {
        console.log(this.props.dispenses);
        console.log(this.props.allPDISurveys);
        console.log(this.props.surveysLoading);
        console.log(this.props.dispensesLoading);
        
        const { allPDISurveys, 
                surveysLoading, 
                surveysLoaded,
                surveyError, 
                dispenses, 
                dispensesLoading, 
                dispensesLoaded,
                dispenseError } = this.props; 

        if(surveyError || dispenseError) {
            return (
                <div>
                    <div>Survey Error: { surveyError ? surveyError.message : null}</div>
                    <div>Dispense Error: {dispenseError ? dispenseError.message : null}</div>
                </div>
            ); 
        }

        if(surveysLoading || dispensesLoading || !surveysLoaded || !dispensesLoaded) {
            return (
                <div>Loading . . . </div>
            )
        }
        // } else if(!surveysLoading && !dispensesLoading && !this.state.retrievedData) {
        //     console.log(dispenses); 
        //     this.loadDataToState(allPDISurveys, dispenses); 
        // }


        console.log(surveysLoading);
        console.log(dispensesLoading);
        console.log(this.state.retrievedData);

        return (
            <div className="pd-container">
                <div className="pd-body">
                    <h1>My Data</h1>
                    <div>
                        <AveragePDISurvey data={allPDISurveys} />
                    </div>
                    <div>
                        <PDISurveyLineGraph data={allPDISurveys} />
                    </div>
                    <div>
                        <PDISurveyStack data={allPDISurveys} />
                    </div>
                    <div>
                        <PDISurveyPie data={allPDISurveys} />
                    </div>
                    {/* <div>
                        <DispenseScatterData data={dispenses} />
                    </div> */}
                    {/* <div>
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
                    </div> */}
                </div>
            </div>
        );
    }
}

PatientData.propTypes = {
    fetchPDISurveys: PropTypes.func.isRequired,
    allPDISurveys: PropTypes.array.isRequired, 
    fetchDispenses: PropTypes.func.isRequired, 
    dispenses: PropTypes.array.isRequired,
    surveysLoading: PropTypes.bool.isRequired,
    surveysLoaded: PropTypes.bool.isRequired,
    dispensesLoading: PropTypes.bool.isRequired,
    dispensesLoaded: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    allPDISurveys: state.surveyState.responses, 
    surveysLoading: state.surveyState.surveysLoading,
    surveysLoaded: state.surveyState.surveysLoaded,
    surveyError: state.surveyState.error,  
    dispenses: state.dispenseState.dispenses, 
    dispensesLoading: state.dispenseState.dispensesLoading,
    dispensesLoaded: state.dispenseState.dispensesLoaded,
    dispenseError: state.dispenseState.error 

});

export default connect(mapStateToProps, { fetchPDISurveys, fetchDispenses })(PatientData);

