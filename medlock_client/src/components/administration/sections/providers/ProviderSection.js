import React, { Component } from 'react';
import UserList from '../../../users/UserList';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class ProviderSection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    viewProvider = (provider) => {
        console.log(`Mock Viewing: ${provider.personalData.name}`);
    }
    
    deleteProvider = (id) => {
        console.log(`Mock Deleting: user(id=${id})`);
    }

    createNewProviderForm = () => {
        return (
            <Form>
                <FormGroup>
                    <Label for="newProviderName">Name</Label>
                    <Input 
                        type="text" 
                        name="newProviderName" 
                        id="newProviderName"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="newProviderEmail">Email</Label>
                    <Input 
                        type="text" 
                        name="newProviderEmail" 
                        id="newProviderEmail"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Button onClick={() => this.props.createNewProvider(this.state.newProviderName, this.state.newProviderEmail)}>Create</Button>
                </FormGroup>
            </Form>
        )
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }
    
    render() {
        return (
            <div>
                <h3>Providers</h3>
                <div className="providerList-container">
                    <UserList 
                        users={this.props.providers}
                        viewUser={this.viewUser}
                        deleteUser={this.deleteUser}
                    />
                </div>
                <div>
                    <h4>Create New Provider</h4>
                    {this.createNewProviderForm()}
                </div>
            </div>
        );
    }
}
