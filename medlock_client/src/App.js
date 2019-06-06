import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
import { Router, Route } from 'react-router-dom'; 
import history from './nav/history';
import Inbox from './pages/Inbox';
import Resources from './pages/Resources';
import PatientData from './pages/PatientData';
import Profile from './pages/Profile';
import DashHeader from './components/dashboard/DashHeader';
import PDISurvey from './components/PDISurvey';
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
          </div>
        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
