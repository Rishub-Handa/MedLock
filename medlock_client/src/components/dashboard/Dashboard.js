import React, { Component } from 'react'; 
import DashIcon from './DashIcon';
import PropTypes from 'prop-types';
import '../../css/Dashboard.css';
import auth0client from '../../auth/Auth';
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import Resources from '../resources/Resources';
import Inbox from '../inbox/Inbox';
import { loadProfile } from '../../actions/profileActions'; 
import { fetchRoles } from '../../actions/authActions';
import { fetchAMT } from '../../auth/AuthManagement'; 
import SecuredRoute from '../SecuredRoute';
import DashHeader from './DashHeader';
import SideBar from '../nav/sidebar/SideBar';
import PatientData from '../patientData/PatientData';
import PDISurvey from '../survey/PDISurvey';
import Dispenser from '../test/Dispenser'; 
import ServerEndpoints from '../test/ServerEndpoints'; 
import { modules } from '../nav/ModuleInfo'; 
import MyPatients from '../myPatients/MyPatients'; 
import NewUser from './NewUser';
import { collapseSideBar, expandSideBar, setSideBarToggle } from '../../actions/sideBarActions'; 

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            profile: {},
            role: null, 
            icons: modules, 
            newUser: false,
        }

    }

    autoCollapseSideBar = (query) => {
        this.props.setSideBarToggle();
        if (query.matches) {
            this.props.collapseSideBar();
        } else {
            this.props.expandSideBar();
        }
    }

    toggleSideBar = () => {
        if (this.props.sideBarCollapsed) this.props.expandSideBar();
        else this.props.collapseSideBar();
    }

    componentDidMount() {

        // media queries
        var x = window.matchMedia("(max-width: 1200px), (max-height: 800px)");
        this.autoCollapseSideBar(x);
        x.addListener(this.autoCollapseSideBar);

        const { userProfile } = auth0client;

        // Fetch the API Management Token. 
        fetchAMT() 
            .then(res => { 
                const AMT = res.data.access_token; 
                this.props.fetchRoles(AMT) 
                    .then(() => {
                        this.props.loadProfile(this.props.roles[0].name) 
                            .then(() => {
                                // Need better method of verifying that this is a new patient. 
                                if(this.props.roles[0].name === 'Patient' && 
                                    !this.props.profile.personalData.bio) { 
                                        this.setState({ 
                                            newUser: true 
                                        });
                                // Testing New Password 
                                } else {
                                    console.log(userProfile); 
                                }
                            });
                    }); 
            }); 
    }

    toggleNewUser = () => {
        this.setState(prevState => {
            return {
                newUser: !prevState.newUser 
            }
        })
    }

    dashboardContentStyle = () => {
        var style;
        if (!this.props.sideBarCollapsed && !this.props.sideBarToggle) {
            style = {
                'grid-column': '3/13',
            }
        } else {
            style = {
                'grid-column': '1/13',
            }
        }
        return style;
    }

    render() {
        console.log(this.state.sideBar);
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
                <NewUser toggle={this.toggleNewUser} profile={this.props.profile} role={roles[0].name}/> 
            );
        }



        return (
            <div className="Dashboard">
                <DashHeader 
                    name={this.props.profile.personalData.name}  
                    toggleSideBar={this.toggleSideBar}
                    sideBarCollapsed={this.props.sideBarCollapsed}
                    sideBarToggle={this.props.sideBarToggle}
                />
                <div className="SideBar-container">
                        <SideBar 
                            roles={this.props.roles} 
                            personalData={this.props.profile.personalData}
                            collapsed={this.props.sideBarCollapsed} 
                />
                </div>
                <div className="Dashboard-content" style={this.dashboardContentStyle()}>
                    {
                        this.props.location.pathname === "/dashboard" ? this.dashboardHTML() : this.makeMainRoutes(this.props)
                    }
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
                    <div className="DashIcon-container">
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

    dashboardHTML = () => {
        return (
            <div className="DashIcons-container">
                {this.iconHTML(this.state.icons, this.props.roles)}
            </div>
        );
    }

    makeMainRoutes = (props) => {
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

    collapseSideBar: PropTypes.func.isRequired,
    expandSideBar: PropTypes.func.isRequired,
    setSideBarToggle: PropTypes.func.isRequired,
    sideBarCollapsed: PropTypes.bool.isRequired,
    sideBarToggle: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profileState.profile,
    profileLoading: state.profileState.profileLoading,
    profileLoaded: state.profileState.profileLoaded,
    profileError: state.profileState.profileError,

    roles: state.authState.roles, 
    rolesLoading: state.authState.rolesLoading, 
    rolesError: state.authState.rolesError, 

    sideBarCollapsed: state.sideBarState.collapsed,
    sideBarToggle: state.sideBarState.toggle,
});

export default connect(mapStateToProps, { 
    loadProfile, 
    fetchRoles, 
    collapseSideBar, 
    expandSideBar, 
    setSideBarToggle 
})(Dashboard); 
