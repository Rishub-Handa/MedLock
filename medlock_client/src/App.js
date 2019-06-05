import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
import { Router, Route } from 'react-router-dom'; 
import history from './nav/history';
import Inbox from './pages/Inbox';
import Resources from './pages/Resources';
import PatientData from './pages/PatientData';
import Profile from './pages/Profile';



function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Dashboard} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/resources" component={Resources} />
        <Route path="/mydata" component={PatientData} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
