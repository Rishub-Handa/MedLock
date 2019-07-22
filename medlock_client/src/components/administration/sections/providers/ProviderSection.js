import React, { Component } from 'react';
import UserList from '../../../users/UserList';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default class ProviderSection extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newProviderFormVisible: false,
        };
    }

    viewProvider = (provider) => {
        console.log(`Mock Viewing: ${provider.personalData.name}`);
    }

    createNewProviderForm = () => {
        if (this.state.newProviderFormVisible) {
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
                        <Button onClick={() => {
                            this.setState({
                                ...this.state,
                                newProviderFormVisible: false,
                            });
                        }}>Cancel</Button>
                        <Button onClick={() => {
                            this.setState({
                                ...this.state,
                                newProviderFormVisible: false,
                            });
                            this.props.createNewProvider(this.state.newProviderName, this.state.newProviderEmail);
                        }}>Create</Button>
                    </FormGroup>
                </Form>
            );
        } else {
            return (
                <Button onClick={() => {
                    this.setState({
                        ...this.state,
                        newProviderFormVisible: true
                    })
                }}>Create New Provider</Button>
            )
        }
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
                        viewUser={this.viewProvider}
                        deleteUser={this.props.deleteProvider}
                    />
                </div>
                <div>{this.createNewProviderForm()}</div>
                <Button onClick={this.props.deleteAllProviders}>Delete All</Button>
            </div>
        );
    }
}
