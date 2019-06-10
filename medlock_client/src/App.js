import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
import { Router, Route } from 'react-router-dom'; 
import history from './components/nav/history';
import Inbox from './components/inbox/Inbox';
import Resources from './components/resources/Resources';
import PatientData from './components/patientData/PatientData';
import Profile from './components/profile/Profile';
import DashHeader from './components/dashboard/DashHeader';
import PDISurvey from './components/survey/PDISurvey';
import { Provider } from 'react-redux';
import store from './store'; 
import Auth from './auth/Auth.js';
import Callback from './components/Callback';
import Home from './components/home/Home';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

const makeMainRoutes = () => {
  return (
      <Router history={history} component={App} >
          <div>
              <Route exact path="/" render={(props) => <div>Main Page</div> } />
              <Route path="/home" render={(props) => <Home auth={auth} {...props} /> } />
              <Route path="/dashboard" render={(props) => <Dashboard auth={auth} {...props} /> } />
              <Route path="/profile" render={(props) => <Profile auth={auth} {...props} /> } />
              <Route path="/mydata" render={(props) => <PatientData auth={auth} {...props} /> } />
              <Route path="/resources" render={(props) => <Resources auth={auth} {...props} /> } />
              <Route path="/callback" render={(props) =>{
                  handleAuthentication(props);
                  return <Callback {...props} />
              }}/>
          </div>
    </Router>
  )
}

function App() {  
  return (
    <Provider store={store}>
        <div>
          <DashHeader auth={auth} />
          <div>{makeMainRoutes()}</div>
        </div>
    </Provider>
    
  );
}

export default App;
