import React, { Component } from 'react';
import PatientList from './PatientList';
import AddPatientForm from './AddPatientForm';
import { fetchAMT } from '../../actions/authActions';
import { registerPatient } from '../../actions/providerActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class MyPatients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPatientForm: false,
        }
    }

    componentDidMount() {
        const { AMT } = this.props;
        if (!AMT) this.props.fetchAMT();
    }

    addPatient = () => {
        this.setState({newPatientForm: true});
    }

    displayNewPatientForm = () => {
        const { newPatientForm } = this.state;
        if (newPatientForm) {
            return (
                <div>
                    <AddPatientForm onSubmit={this.submitForm} />
                </div>
            );
        }
        
        else {
            return (
                <div>
                    <Button onClick={this.addPatient}>Register Patient</Button>
                </div>
            )
        }
    }

    submitForm = (email) => {
        const { AMT } = this.props;

        if (!AMT) {
            console.log("AMT NOT DEFINED!");
        }

        else {

            const newPatient = {
                "email": email,
                "password": "Password123!",
                "connection": "Username-Password-Authentication"
            };

            this.props.registerPatient(newPatient, AMT.access_token);
        }
    }
    
    render() {
        const { AMTLoading, AMTError, patientRegistering, registerError } = this.props;
        
        if(AMTError || registerError) {
            return (
                <div>
                    <p>API Management Token Error: {AMTError ? AMTError.message : null}</p>
                    <p>Register Error: {registerError ? registerError.message : null}</p>
                </div>
            )
        }
        
        if (AMTLoading) {
            return (
                <div>
                    API Management Token Loading . . . 
                </div>
            )
        }

        if (patientRegistering) {
            return (
                <div>
                    Registering patient . . .
                </div>
            )
        }

        const tempPatients = [
            {
                name: "Jane"
            },
            {
                name: "Joe"
            },
            {
                name: "Bill"
            },
        ];

        return (
            <div>
                <PatientList patients={tempPatients} />
                {this.displayNewPatientForm()}
            </div>
        );
    }
}

MyPatients.propTypes = {
    registerPatient: PropTypes.func.isRequired,
    patients: PropTypes.array.isRequired,
    patient: PropTypes.object.isRequired,
    patientRegistering: PropTypes.bool.isRequired,
    registerError: PropTypes.object.isRequired,
    fetchAMT: PropTypes.func.isRequired, 
    AMT: PropTypes.object.isRequired, 
    AMTLoading: PropTypes.bool.isRequired, 
    AMTError: PropTypes.object.isRequired, 

}

const mapStateToProps = state => ({
    AMT: state.authState.AMT,
    AMTLoading: state.authState.AMTLoading,
    AMTError: state.authState.AMTError,
    patients: state.providerState.patients,
    patient: state.providerState.patient,
    patientRegistering: state.providerState.patientRegistering,
    registerError: state.providerState.registerError
});

export default connect(mapStateToProps, { fetchAMT, registerPatient })(MyPatients);
