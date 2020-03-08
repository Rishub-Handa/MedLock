import React, { Component } from 'react'; 
import DashIcon from './DashIcon'; 
import DispenserCode from './DispenserCode'; 
import PropTypes from 'prop-types';
import '../../css/Dashboard.css';
import auth0client from '../../auth/Auth';
import { connect } from 'react-redux';
import Profile from '../profile/Profile';
import Resources from '../resources/Resources';
 //import Inbox from '../inbox/Inbox';
import { loadProfile } from '../../actions/profileActions'; 
import { fetchRoles } from '../../actions/authActions';
import { fetchAMT } from '../../auth/AuthManagement'; 
import SecuredRoute from '../SecuredRoute';
import DashHeader from './DashHeader';
import SideBar from '../nav/sidebar/SideBar';
import PatientData from '../patientData/PatientData';
import PDISurvey from '../survey/PDISurvey';
import Surveys from '../survey/Surveys'; 
import Dispenser from '../test/Dispenser'; 
import ServerEndpoints from '../test/ServerEndpoints'; 
import { modules } from '../nav/ModuleInfo'; 
import MyPatients from '../myPatients/MyPatients'; 
import NewUser from './NewUser';
import { collapseSideBar, expandSideBar, setSideBarToggle } from '../../actions/sideBarActions'; 
import ReactGA from 'react-ga'; 
import history from '../nav/history';


console.log(auth0client.getProfile()); 

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            profile: {},
            role: null, 
            icons: modules, 
            newUser: false, 
            toggleCodeDisplay: false
        }
    }

    routeToAdminPage = () => {
        console.log("rerouting to admin");
        history.replace('/admin');
    }

    checkAdminStatus = () => {
        console.log("checking");
        // is there a more secure way to do this?
        if (this.props.roles[0].name.toLowerCase() == "admin") {
            return true;
        } else {
            return false;
        }
    }

    displayDispenserCode = () => {
        console.log("Display Dispenser Code. "); 
        ReactGA.event({
            category: 'Pop Up Modal', 
            action: 'Generated dispenser code from Dashboard', 
            label: 'Add Dispenser from Dashboard' 
        })
        this.setState({
            toggleCodeDisplay: true 
        }); 
    }

    hideDispenserCode = () => {
        this.setState({
            toggleCodeDisplay: false 
        }); 
    }

    autoCollapseSideBar = (query) => {
        //not getting called at the right times
        this.props.setSideBarToggle();
        if (query.matches) {
            this.props.collapseSideBar();
        } else {
            this.props.expandSideBar();
        }
    }

    toggleSideBar = () => {
        if (this.props.sideBarCollapsed) {
            ReactGA.event({
                category: 'SideBar Toggle', 
                action: 'Expanded SideBar', 
                label: 'Click Sidebar Menu Icon to Expand' 
            })
            this.props.expandSideBar();
        } 
        else {
            ReactGA.event({
                category: 'SideBar Toggle', 
                action: 'Collapsed SideBar', 
                label: 'Click Sidebar Menu Icon to Collapse' 
            })
            this.props.collapseSideBar(); 
        }
    }

    componentDidMount() {
        // media queries
        var x = window.matchMedia("(max-width: 1024px)");
        this.autoCollapseSideBar(x);
        x.addListener(this.autoCollapseSideBar);

        const { userProfile } = auth0client; 

        console.log(userProfile); 

        console.log(userProfile.sub.substring(6)); 
        ReactGA.set({
            userId: userProfile.sub.substring(6),
          }); 
        
        var ga = ReactGA.ga(); 
        ReactGA.timing(); 

        // Fetch the API Management Token. 
        fetchAMT() 
            .then(res => { 
                const AMT = res.data.access_token; 
                console.log(`AMT: ${AMT}`);
                this.props.fetchRoles(AMT) 
                    .then(() => {
                        if (this.checkAdminStatus()) {
                            this.routeToAdminPage();
                        } else {
                            this.props.loadProfile(this.props.roles[0].name) 
                            .then(() => {
                                console.log(this.props);
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
                        }
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
        if (this.props.sideBarCollapsed) {
            style = {
                'grid-column': '1/13',
            }
        } else {
            style = {
                'grid-column': '3/13',
            }
        }
        return style;
    }

    render() { 

        // ReactGA.ga('create', 'UA-155183323-1', { 'userId': '1234' }); 
        // ReactGA.ga('set', 'dimension1', '1234'); 
        var USER_ID = 'myUserId'; 
        // At a later time, once the `userId` value is known,
        // sets the value on the tracker.
        // ReactGA.ga('set', 'userId', USER_ID);

        // Setting the userId doesn't send data to Google Analytics.
        // You must also use a pageview or event to send the data.
        // ReactGA.ga('send', 'event', 'authentication', 'user-id available');

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

        if (!profile || profileLoading) {
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
                {this.state.toggleCodeDisplay ? 
                    <div className="Grey-Layer"></div> : null}
                {this.state.toggleCodeDisplay ? 
                    <div className="DispenserCode-container">
                        <DispenserCode hideDispenserCode={this.hideDispenserCode}
                                        userProfile={this.props.profile}/> 
                    </div> 
                    : null 
                }
                
                <div className="DashHeader-container">
                    <DashHeader
                        name={this.props.profile.personalData.name}  
                        roles={roles}
                        toggleSideBar={this.toggleSideBar}
                        sideBarCollapsed={this.props.sideBarCollapsed}
                        sideBarToggle={this.props.sideBarToggle}
                        displayDispenserCode={this.displayDispenserCode}
                    />
                </div>
                <div className="SideBar-container">
                        <SideBar 
                            roles={this.props.roles} 
                            personalData={this.props.profile.personalData}
                            toggle={this.toggleSideBar}
                            togglable={this.sideBarToggle}
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
                        <DashIcon 
                            name={icon.name} 
                            id={icon.id}
                            roles={icon.roles} 
                            content={icon.content} 
                            link={icon.link} 
                        />
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
            <div className="SecuredRoutes-container">
                <SecuredRoute path="/dashboard/profile" personalData={props.profile.personalData} component={Profile} />
                {/* <SecuredRoute path="/dashboard/inbox" component={Inbox} /> */}
                <SecuredRoute path="/dashboard/mydata" patient={props.profile} component={PatientData} />
                <SecuredRoute path="/dashboard/resources" component={Resources} />
                <SecuredRoute path="/dashboard/survey" component={Surveys} />
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
