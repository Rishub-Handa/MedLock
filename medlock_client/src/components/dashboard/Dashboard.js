import React, { Component } from 'react'; 
import DashIcon from './DashIcon';
import PropTypes from 'prop-types';
import '../../css/Dashboard.css';
import auth0client from '../../auth/Auth';
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import Resources from '../resources/Resources';
import Inbox from '../inbox/Inbox';
import { loadProfile, createProfile, fetchRoles, fetchAMT } from '../../actions/profileActions'; 
import SecuredRoute from '../SecuredRoute';
import DashHeader from './DashHeader';
import SideBar from '../nav/SideBar';
import PatientData from '../patientData/PatientData';
import PDISurvey from '../survey/PDISurvey';
import PatientList from '../patientList/PatientList'; 
import Dispenser from '../test/Dispenser'; 
import { modules } from '../nav/ModuleInfo'; 

const makeMainRoutes = (props) => {
    return (
        <div>
            <SecuredRoute path="/dashboard/profile" personalData={props.profile.personalData} component={Profile} />
            <SecuredRoute path="/dashboard/inbox" component={Inbox} />
            <SecuredRoute path="/dashboard/mydata" profile={props.profile} component={PatientData} />
            <SecuredRoute path="/dashboard/resources" component={Resources} />
            <SecuredRoute path="/dashboard/survey" component={PDISurvey} />
            <SecuredRoute path="/dashboard/dispenser" profile={props.profile} component={Dispenser} /> 
            <SecuredRoute path="/dashboard/mypatients" component={PatientList} /> 
        </div>
    );   
}

class Dashboard extends Component {
    constructor(props) {
        super(props);

        // Fetch the API Management Token. 
        this.props.fetchAMT(); 

        this.state = {
            profile: {},
            role: null, 
            icons: modules 
        }
    }

    // Change this so API Management Token -> Roles -> Load Profile -> If !profile.fields, display NewUser 
    componentDidUpdate() {
        console.log("componentDidUpdate");
        // Fetch the Roles with the API Management Token. 
        if(this.props.AMT && !this.props.roles) {
            this.props.fetchRoles(this.props.AMT.access_token); 
        }

        // Fetch the Profile from the Database with the Roles. 
        if(this.props.roles && !this.props.profileLoading && !this.props.profileLoaded) {
            this.props.loadProfile(this.props.roles[0].name); 
        }

        // If loading a profile does not work, then create a new profile in the database. 
        if(this.props.profileError && !this.props.profile && !this.props.profileCreating) {
            console.log("Running Create prof"); 
            const { userProfile } = auth0client; 

            // Display New User Form 
        
            this.props.createProfile({
                roles: this.props.roles[0].name, 
                _id: userProfile.sub.substring(6), 
                personalData: {
                    name: userProfile.name
                }
            })
        }

    }

    render() {
        console.log("render");
        
        const { profile, profileLoading, profileCreating, profileError, 
                roles, rolesLoading, rolesError,
                AMT, AMTLoading, AMTError } = this.props;

        console.log(profile);
        if(AMT) {
            console.log(AMT); 
            console.log(roles); 
        }

        if(rolesError || profileError || AMTError) {
            return (
                <div>
                    <p>Profile Error: {profileError ? profileError.message : null}</p>
                    <p>Roles Error: {rolesError ? rolesError.message : null}</p>
                    <p>API Management Token Error: {AMTError ? AMTError.message : null}</p>
                </div>
            )
        }
        
        
        if(AMTLoading) {
            return (
                <div>
                    API Management Token Loading . . . 
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
            console.log(profile); 
            return (
                <div>
                    Profile Loading . . .
                </div>
            );
        } 

        if (this.props.location.pathname === "/dashboard") {
            console.log(this.props);
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
    createProfile: PropTypes.func.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    profileLoaded: PropTypes.bool.isRequired,
    profileCreating: PropTypes.bool.isRequired,
    profileCreated: PropTypes.bool.isRequired,
    profileCreateError: PropTypes.object.isRequired, 
    profileError: PropTypes.string, 
    roles: PropTypes.object.isRequired, 
    fetchRoles: PropTypes.func.isRequired, 
    rolesLoading: PropTypes.bool.isRequired, 
    rolesError: PropTypes.string, 
    AMT: PropTypes.object.isRequired, 
    fetchAMT: PropTypes.func.isRequired, 
    AMTLoading: PropTypes.bool.isRequired, 
    AMTError: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    profile: state.profileState.profile,
    profileLoading: state.profileState.profileLoading,
    profileLoaded: state.profileState.profileLoaded,
    profileCreating: state.profileState.profileCreating,
    profileCreated: state.profileState.profileCreated,
    profileCreateError: state.profileState.profileCreateError, 
    profileError: state.profileState.profileError, 
    roles: state.profileState.roles, 
    rolesLoading: state.profileState.rolesLoading, 
    rolesError: state.profileState.rolesError, 
    AMT: state.profileState.AMT, 
    AMTLoading: state.profileState.AMTLoading, 
    AMTError: state.profileState.AMTError 
});

export default connect(mapStateToProps, { loadProfile, createProfile, fetchRoles, fetchAMT })(Dashboard); 
