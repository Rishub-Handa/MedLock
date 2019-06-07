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

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <DashHeader />
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/resources" component={Resources} />
            <Route path="/mydata" component={PatientData} />
            <Route path="/profile" component={Profile} />
            <Route path="/survey" component={PDISurvey} />
          </div>
        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
