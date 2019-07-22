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
            <div>
                <div className="PatientSection-header">
                    <h3>Patients</h3>
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
                        <Button color="danger" onClick={this.props.deleteAllPatients}>Delete All</Button>
                    </div>
                </div>
            </div>
        );
    }
}
