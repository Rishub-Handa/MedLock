import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
import { Route } from 'react-router-dom'; 
import Callback from './components/Callback';
import Home from './components/home/Home';
import auth0client from './auth/Auth';
import SecuredRoute from './components/SecuredRoute';
import Login from './components/login/Login';
import Admin from './components/administration/Admin'; 
import { withRouter } from 'react-router-dom';

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        console.log(nextState)
        console.log(nextState.location.hash)
        console.log(/access_token|id_token|error/.test(nextState.location.hash))
        auth0client.handleAuthentication();
    }
}

const makeMainRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/admin" component={Admin} />
      <SecuredRoute path="/home" component={Home} />
      <SecuredRoute path="/dashboard" component={Dashboard} />
      <Route path="/callback" render={(props) =>{
          handleAuthentication(props);
          return <Callback {...props} />
      }} />
    </div>
  );
}

export class App extends Component {

  render() {
    return ( 
      <div className="App">
          { makeMainRoutes() } 
      </div>

    );
  }
}

export default withRouter(App);
