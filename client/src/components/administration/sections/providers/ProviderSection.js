import React, { Component } from 'react';
import UserList from '../../../users/UserList';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
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
                        <Label for="newProviderName" className="form-heading">Name</Label>
                        <Input 
                            type="text" 
                            name="newProviderName" 
                            id="newProviderName"
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="newProviderEmail" className="form-heading">Email</Label>
                        <Input 
                            type="text" 
                            name="newProviderEmail" 
                            id="newProviderEmail"
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button className="red-button" onClick={() => {
                            this.setState({
                                ...this.state,
                                newProviderFormVisible: false,
                            });
                        }}>Cancel</Button>
                        <Button className="blue-button" onClick={() => {
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
                <Button className="blue-button" onClick={() => {
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
            <div className="ProviderSection">
                <div className="ProviderSection-header">
                    <h3 className="header">Providers</h3>
                </div>
                <div className="ProviderSection-content">
                    <div className="providerList-container">
                        <UserList 
                            users={this.props.providers}
                            viewUser={this.viewProvider}
                            deleteUser={this.props.deleteProvider}
                            deleteAllUsers={this.props.deleteAllProviders}
                            createNewUser={this.props.createNewProvider}
                        />
                    </div>
                    {/* <div>
                        {this.createNewProviderForm()}
                    </div> */}
                    {/* <div>
                        <Button align="center" className="red-button" onClick={this.props.deleteAllProviders}>Delete All</Button>
                    </div> */}
                </div>
            </div>
        );
    }
}
