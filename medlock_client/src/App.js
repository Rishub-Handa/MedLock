import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; 
// Test Survey 
import PDISurvey from './components/PDISurvey'; 

function App() {
  return (
    <div className="App">
      <Dashboard />
      <PDISurvey />
    </div>
  );
}

export default App;
