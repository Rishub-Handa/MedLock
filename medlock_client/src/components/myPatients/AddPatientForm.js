import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


export default class AddPatient extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: null, 
            email: null 
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="patient-name">Name</Label>
                        <Input type="text" name="name" id="patient-name" 
                                placeholder="Jon Snow" 
                                value={this.state.name} 
                                onChange={this.onChange} />
                        <Label for="patient-email">Email</Label>
                        <Input type="email" name="email" id="patient-email" 
                                placeholder="jon.snow@nightswatch.org" 
                                value={this.state.email} 
                                onChange={this.onChange} />
                    </FormGroup>
                    <Button onClick={() => this.props.onSubmit(this.state.name, this.state.email)}>Register</Button>
                </Form>
            </div>
        );
    }
}
