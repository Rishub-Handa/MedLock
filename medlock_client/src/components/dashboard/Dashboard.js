import React, { Component } from 'react'; 
import DashIcon from './DashIcon';
import PropTypes from 'prop-types';
import '../../css/Dashboard.css';
import auth0client from '../../auth/Auth';
import { newPassword } from '../../auth/AuthManagement'; 
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import Resources from '../resources/Resources';
import Inbox from '../inbox/Inbox';
import { loadProfile } from '../../actions/profileActions'; 
import { fetchRoles } from '../../actions/authActions';
import { fetchAMT } from '../../auth/AuthManagement'; 
import SecuredRoute from '../SecuredRoute';
import DashHeader from './DashHeader';
import SideBar from '../nav/SideBar';
import PatientData from '../patientData/PatientData';
import PDISurvey from '../survey/PDISurvey';
import Dispenser from '../test/Dispenser'; 
import ServerEndpoints from '../test/ServerEndpoints'; 
import { modules } from '../nav/ModuleInfo'; 
import MyPatients from '../myPatients/MyPatients'; 
import NewUser from './NewUser'; 
import PatientView from '../patientView/PatientView';

const makeMainRoutes = (props) => {
    return (
        <div>
            <SecuredRoute path="/dashboard/profile" personalData={props.profile.personalData} component={Profile} />
            <SecuredRoute path="/dashboard/inbox" component={Inbox} />
            <SecuredRoute path="/dashboard/mydata" profile={props.profile} component={PatientData} />
            <SecuredRoute path="/dashboard/resources" component={Resources} />
            <SecuredRoute path="/dashboard/survey" component={PDISurvey} />
            <SecuredRoute path="/dashboard/dispenser" profile={props.profile} component={Dispenser} /> 
            <SecuredRoute path="/dashboard/serverendpoints" component={ServerEndpoints} /> 
            <SecuredRoute path="/dashboard/mypatients" component={MyPatients} />
        </div>
    );   
}

class Dashboard extends Component {
    constructor(props) {
        super(props);

        // Testing New Password 
        const { userProfile } = auth0client; 


        // Fetch the API Management Token. 
        // TODO - move to component did mount for better lifecycle 
        fetchAMT() 
            .then(res => { 
                const AMT = res.data.access_token; 
                this.props.fetchRoles(AMT) 
                    .then(() => {
                        this.props.loadProfile(this.props.roles[0].name) 
                            .then(() => {
                                // Need better method of verifying that this is a new patient. 
                                if(this.props.roles[0].name === 'Patient' && 
                                    !this.props.profile.personalData.birthday) { 
                                        this.setState({ 
                                            newUser: true 
                                        })
                                // Testing New Password 
                                } else {
                                    console.log(userProfile); 
                                }
                            });
                    }); 
            }); 

        this.state = {
            profile: {},
            role: null, 
            icons: modules, 
            newUser: false 
        }
    }

    toggleNewUser = () => {
        this.setState(prevState => {
            return {
                newUser: !prevState.newUser 
            }
        })
    }

    render() {
        console.log(this.props);
        const { profile, profileLoading, profileError, 
                roles, rolesLoading, rolesError } = this.props;

        if(rolesError || profileError) {
            return (
                <div>
                    <p>Profile Error: {profileError ? profileError.message : null}</p>
                    <p>Roles Error: {rolesError ? rolesError.message : null}</p>
                </div>
            )
        } 

        if(rolesLoading) {
            return (
                <div>
                    Roles Loading . . . 
                </div>
            )
        }

        if (!profile) {
            return (
                <div>
                    Profile Loading . . .
                </div>
            );
        } 

        if(this.state.newUser) {
            return (
                <NewUser toggle={this.toggleNewUser} profile={this.props.profile}/> 
            )
        }

        if (this.props.location.pathname === "/dashboard") {
            return (
                <div>
                    <DashHeader name={this.props.profile.personalData.name} />
                    <div className="dashboard-content">
                        <SideBar roles={this.props.roles}/>
                        <div className="icon-container">
                            {this.iconHTML(this.state.icons, this.props.roles)}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <DashHeader name={this.props.profile.personalData.name} />
                <div className="dashboard-content" >
                    <SideBar roles={this.props.roles}/>
                    {makeMainRoutes(this.props)}
                </div>

            </div>
        )
    }

    iconHTML = (icons, roles) => {
        try {
            return icons.filter(icon => {
                    if(!icon.roles) return false; 
                    
                    for(let i = 0; i < icon.roles.length; i++) {
                        if(icon.roles[i].name === roles[0].name) 
                            return true; 
                    }
                    return false; 
                }). 
                map(icon => (
                    <div className="icon">
                        <DashIcon name={icon.name} 
                                roles={icon.roles} 
                                content={icon.content} 
                                link={icon.link} />
                    </div>
                ))
        } catch(error) { console.log(error); } 

        return (
            <div>Loading . . . </div>
        )
    };


    
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    loadProfile: PropTypes.func.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    profileLoaded: PropTypes.bool.isRequired, 
    profileError: PropTypes.string, 
    roles: PropTypes.object.isRequired, 
    fetchRoles: PropTypes.func.isRequired, 
    rolesLoading: PropTypes.bool.isRequired, 
    rolesError: PropTypes.string, 
}

const mapStateToProps = state => ({
    profile: state.profileState.profile,
    profileLoading: state.profileState.profileLoading,
    profileLoaded: state.profileState.profileLoaded,
    profileError: state.profileState.profileError, 
    roles: state.authState.roles, 
    rolesLoading: state.authState.rolesLoading, 
    rolesError: state.authState.rolesError, 
});

export default connect(mapStateToProps, { loadProfile, fetchRoles })(Dashboard); 
