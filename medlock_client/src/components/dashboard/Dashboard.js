import React, { Component } from 'react'; 
import DashIcon from './DashIcon';
import PropTypes from 'prop-types';
import '../../css/Dashboard.css';
import auth0client from '../../auth/Auth';
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import Resources from '../resources/Resources';
import Inbox from '../inbox/Inbox';
import { loadProfile, createProfile } from '../../actions/profileActions';
import SecuredRoute from '../SecuredRoute';
import DashHeader from './DashHeader';
import SideBar from '../nav/SideBar';
import PatientData from '../patientData/PatientData';
import PDISurvey from '../survey/PDISurvey';
import Dispenser from '../test/Dispenser';

const makeMainRoutes = (props) => {
    console.log("make routes");
    console.log(props.profile.personalData);
    return (
        <div>
            <SecuredRoute path="/dashboard/profile" personalData={props.profile.personalData} component={Profile} />
            <SecuredRoute path="/dashboard/inbox" component={Inbox} />
            <SecuredRoute path="/dashboard/mydata" profile={props.profile} component={PatientData} />
            <SecuredRoute path="/dashboard/resources" component={Resources} />
            <SecuredRoute path="/dashboard/survey" component={PDISurvey} />
            <SecuredRoute path="/dashboard/dispenser" profile={props.profile} component={Dispenser} />
        </div>
    );   
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const { userProfile } = auth0client;
        console.log(auth0client);
        this.state = {
            profile: {},
            icons: [
                {
                    name: 'Inbox', 
                    content: {
                        image: '', 
                        description: 'Access your messages from providers'
                    },
                    link: '/dashboard/inbox'
                },
                {
                    name: 'My Data',
                    content:  {
                        image: '',
                        description: 'View your data'
                    },
                    link: '/dashboard/mydata'
                },
                {
                    name: 'Resources',
                    content: {
                         image: '',
                        description: 'Browse resources that can help you stay sober'
    
                    },
                    link: '/dashboard/resources'
                }
            ]
        }
    }
    
    iconHTML = icons => {
        return icons.map(icon => (
            <div className="icon">
                <DashIcon name={icon.name} content={icon.content} link={icon.link} />
            </div>
        ))
    };

    componentDidMount() {
        console.log("componentDidMount");
        this.props.loadProfile();
    }

    render() {
        console.log("render");

        const { profile, loadingProfile, creatingProfile, error } = this.props;
        
        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            );
        }

        if (loadingProfile || creatingProfile || !profile) {
            return (
                <div>
                    Loading . . .
                </div>
            );
        } 

        if (this.props.location.pathname === "/dashboard") {
            console.log(this.props);
            return (
                <div>
                    <DashHeader name={this.props.profile.personalData.name} />
                    <div className="dashboard-content">
                        <SideBar />
                        <div className="icon-container">
                            {this.iconHTML(this.state.icons)}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <DashHeader name={this.props.profile.personalData.name} />
                <div className="dashboard-content" >
                    <SideBar />
                    {makeMainRoutes(this.props)}
                </div>

            </div>
        )
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        console.log(this.props.profile);
        const { userProfile } = auth0client;
        if(this.props.loadedProfile && !this.props.creatingProfile && !this.props.profile) {
            this.props.createProfile({
                _id: userProfile.sub.substring(6),
                personalData: {
                    name: userProfile.name,
                    bio: "default bio"
                }
            });
        }
    }
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    loadProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    loadingProfile: PropTypes.bool.isRequired,
    loadedProfile: PropTypes.bool.isRequired,
    creatingProfile: PropTypes.bool.isRequired,
    createdProfile: PropTypes.bool.isRequired,
    error: PropTypes.string,
}

const mapStateToProps = state => ({
    profile: state.profileState.profile,
    loadingProfile: state.profileState.loadingProfile,
    loadedProfile: state.profileState.loadedProfile,
    creatingProfile: state.profileState.creatingProfile,
    createdProfile: state.profileState.createdProfile,
    error: state.profileState.error
});

export default connect(mapStateToProps, { loadProfile, createProfile })(Dashboard); 
