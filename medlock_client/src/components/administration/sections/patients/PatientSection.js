import React, { Component } from 'react';
import UserList from '../../../users/UserList';
import { Button } from 'reactstrap';
import '../../../../css/Admin.css';


export default class PatientSection extends Component {
    viewUser = (user) => {
        console.log(`Mock Viewing: ${user.personalData.name}`);
    }
    
    deleteUser = (id) => {
        console.log(`Mock Deleting: user(id=${id})`);
    }
    
    render() {
        return (
            <div className="PatientSection">
                <div className="PatientSection-header">
                    <h3 className="header">Patients</h3>
                </div>
                <div className="ProviderSection-content">
                    <div className="patientList-container">
                        <UserList 
                            users={this.props.patients}
                            viewUser={this.viewUser}
                            deleteUser={this.props.deletePatient}
                        />
                    </div>
                    <div>
                        <Button className="red-button" onClick={this.props.deleteAllPatients}>Delete All</Button>
                    </div>
                </div>
            </div>
        );
    }
}
