import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
import { Route } from 'react-router-dom'; 
import Inbox from './components/inbox/Inbox';
import Resources from './components/resources/Resources';
import PatientData from './components/patientData/PatientData';
import Profile from './components/profile/Profile';
import DashHeader from './components/dashboard/DashHeader';
import PDISurvey from './components/survey/PDISurvey';
import { Provider } from 'react-redux';
import Auth from './auth/Auth.js';
import Callback from './components/Callback';
import Home from './components/home/Home';
import Dispenser from './components/test/Dispenser'; 
import auth0client from './auth/Auth';
import SecuredRoute from './components/SecuredRoute';
import Login from './components/Login';

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth0client.handleAuthentication();
    }
}

const makeMainRoutes = () => {
  return (
    <div>
      <Route exact path="/" render={(props) => 
        <div>
          <h1>You need to login.</h1>
          <Login />
        </div> } />
      <SecuredRoute path="/home" component={Home} />
      <SecuredRoute path="/dashboard" component={Dashboard} />
      <SecuredRoute path="/profile" component={Profile} />
      <SecuredRoute path="/mydata" component={PatientData} />
      <SecuredRoute path="/resources" component={Resources} />
      <SecuredRoute path="/dispenser" component={Dispenser} />
      <Route path="/callback" render={(props) =>{
          console.log("called");
          handleAuthentication(props);
          return <Callback {...props} />
      }} />
    </div>
  );
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  // async componentDidMount() {
  //   if (this.props.location.pathname === '/callback') {
  //     this.setState({
  //       checkingSession: false
  //     });
  //     return;
  //   }
  //   try {
  //     await auth0client.silentAuth();
  //     this.forceUpdate();
  //   } catch (err) {
  //     if (err.error !== 'login_required') {
  //       console.log(err.error);
  //     }
  //   }
  //   this.setState({
  //     checkingSession: false
  //   });
  // }

  render() {
    console.log(this.props);
    console.log(auth0client);
    return ( 
      <div>
        <DashHeader /> 
        { makeMainRoutes() } 
      </div>

    );
  }
}

export default App;
