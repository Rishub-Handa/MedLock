import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class DispenserInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            btn1: this.props.dispenser.info.button_meanings[0],
            btn2: this.props.dispenser.info.button_meanings[1],
            btn3: this.props.dispenser.info.button_meanings[2],
        };
    }

    // controls whether meanings are editable
    toggleEditable = () => {
        var editable = this.state.editable;

        if (editable) {
            this.onSave();
        }

        this.setState({
            ...this.state,
            editable: !this.state.editable,
        });
    }

    nonEditableHTML = () => {
        return (
            <div>
                <p>Button 1: <span>{this.state.btn1}</span></p>
                <p>Button 2: <span>{this.state.btn2}</span></p>
                <p>Button 3: <span>{this.state.btn3}</span></p>
            </div>
        );
    }

    editableHTML = () => {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="btn1">Button 1:</Label>
                        <Input type="text" id="btn1" placeholder={this.state.btn1} onChange={this.onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="btn2">Button 2:</Label>
                        <Input type="text" id="btn2" placeholder={this.state.btn2} onChange={this.onChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="btn3">Button 3:</Label>
                        <Input type="text" id="btn3" placeholder={this.state.btn3} onChange={this.onChange}></Input>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    onSave = () => {
        console.log("onSave called");
        this.props.updateButtonMeaning(
            this.props.dispenser._id, 
            [this.state.btn1, this.state.btn2, this.state.btn3]
        );
    }

    onChange = e => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
        console.log(this.state);
    }

    render() {
        console.log(this.state);
        return (
            <div className="DispenserInfo">
                {this.state.editable ? this.editableHTML() : this.nonEditableHTML()}
                <button onClick={this.toggleEditable}>{this.state.editable ? "Save" : "Edit"}</button>
            </div>
        );
    }
}
