import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllClinics, registerNewClinic, addProviderToClinic } from '../../actions/clinicActions';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import auth0client from '../../auth/Auth';
import { MEDLOCK_API } from '../../config/servers';
import { resetPassword } from '../../auth/AuthManagement'; 
import '../../css/NewUser.css';


class NewProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinic: "other",
            new_clinic: "",
        };
    }

    componentDidMount() {
        alert("Please select an existing clinic or register a new one.");
        this.props.fetchAllClinics();
    }

    clinicsToOptions = () => {
        return this.props.clinics.map((clinic, i) => { 
            return (
                <option value={clinic._id}>{clinic.name}</option>
            )
        });
    }

    onChange = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        }, () => {
            console.log(this.state);
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.clinic == "other") {
            var newClinic = {
                name: this.state.new_clinic,
            };
            this.props.registerNewClinic(newClinic)
                .then((clinic) => {

                    var providerId = this.props.profile._id;
                    var clinicId = clinic._id;

                    this.props.addProviderToClinic(providerId, clinicId);
                })
                .catch(error => console.log(error));
        } else {
            var providerId = this.props.profile._id;
            var clinicId = this.state.clinic;
            this.props.addProviderToClinic(providerId, clinicId);
        }

        resetPassword(this.props.profile.personalData.email);
        this.props.toggle();
    }

    render() {
        return (
            <div className="NewUser">
                <div>
                    <Form>
                        <FormGroup required>
                            <Label for="pi-clinic">Clinic</Label>
                            <Input type="select" name="clinic" id="pi-clinic" value={this.state.clinic} onChange={this.onChange}>
                                {this.clinicsToOptions()}
                                <option value={"other"}>Other</option>
                            </Input>
                        </FormGroup>
                        { this.state.clinic == "other" ? 
                            <FormGroup required>
                                <Label for="new-clinic">New Clinic Name</Label>
                                <Input type="text" name="new_clinic" id="new-clinic" value={this.state.new_clinic} onChange={this.onChange}></Input>
                            </FormGroup>
                            : <div></div>
                        }
                        <Button onClick={this.onSubmit}>Select Clinic</Button>
                    </Form> 
                </div>               
            </div>
        )
    }
}

const mapStateToProps = state => ({
    clinics: state.clinicState.clinics,
    clinicsFetching: state.clinicState.clinicsFetching,
    clinicsFetched: state.clinicState.clinicsFetched,
    clinicsError: state.clinicState.clinicsError,
    lastRegistered: state.clinicState.lastRegistered,
});

export default connect(mapStateToProps, { fetchAllClinics, registerNewClinic, addProviderToClinic })(NewProvider);
