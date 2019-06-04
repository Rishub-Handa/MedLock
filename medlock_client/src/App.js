import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'; 
import { Router, Route } from 'react-router-dom'; 
import Inbox from './pages/Inbox';
import Resources from './pages/Resources';
import PatientData from './pages/PatientData';
import history from './nav/history';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Dashboard} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/resources" component={Resources} />
        <Route path="/mydata" component={PatientData} />
      </div>
    </Router>
  );
}

export default App;
