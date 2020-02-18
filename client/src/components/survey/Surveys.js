import React, { Component } from 'react'; 
import PDISurvey from './PDISurvey'; 
import SecuredRoute from '../SecuredRoute'; 
import history from '../nav/history'; 
import IntakeSurvey from './IntakeSurvey'; 
import '../../css/Surveys.css';
import ReactGA from 'react-ga'; 

class Surveys extends Component {

    componentDidMount() {
        console.log(this.props); 
    }

    surveyLink = (e) => {
        // history.replace(this.props.link);
        ReactGA.event({
            category: 'Survey Selection', 
            action: 'Navigated to ' + this.surveyLink + ' from Surveys', 
            label: 'Click ' + this.surveyLink + ' from Surveys'
        }); 
        console.log(e); 
        console.log(e.target.value); 
        history.replace(e.target.value); 
    }

    render() {
        return (
            <div>
                {
                    this.props.location.pathname == "/dashboard/survey" ? this.surveysHTML() : this.makeSurveyRoutes(this.props)

                }
            </div>
        )
    }

    surveysHTML = () => {
        return (
            <div>
                <h1 style={{marginBottom: "20px"}} class="header">Surveys</h1>
                <button class="create-new-btn" value="/dashboard/survey/pdisurvey" onClick={this.surveyLink}>PDI Survey</button>
                <button class="create-new-btn" value="/dashboard/survey/intake" onClick={this.surveyLink}>Intake Survey</button>
            </div>
        ); 
    }

    makeSurveyRoutes = (props) => {

        switch(this.props.location.pathname) {
            case "/dashboard/survey/pdisurvey": 
                return ( <SecuredRoute path="/dashboard/survey/pdisurvey" component={PDISurvey} /> ); 
                break; 
            case "/dashboard/survey/intake": 
                return ( <SecuredRoute path="/dashboard/survey/intake" component={IntakeSurvey} /> ); 
                break;     
            default: 
                break; 
        }
    } 


}


export default Surveys; 