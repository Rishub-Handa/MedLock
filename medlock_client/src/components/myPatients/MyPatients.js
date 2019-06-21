import React, { Component } from 'react';
import PatientList from './PatientList';


export default class MyPatients extends Component {
    
    addPatient = () => {
        
    }
    
    render() {
        return (
            <div>
                <PatientList onClick={this.addPatient} patients={} />
            </div>
        );
    }
}
