import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Text } from 'reactstrap';
import '../../css/ProfileModule.css';

import PropTypes from 'prop-types';

class ProfileModule extends Component {
    
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            name: this.props.name,
            content: this.props.content,
            editable: this.props.editable
        }
    }

    editableHTML = () => {
        return (
            <div className="profileModule-content">
                <Form>
                    <FormGroup>
                        <Input type="text" name="name" id="form-name" placeholder="Name" value={this.state.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="content" id="form-content" placeholder="Content" value={this.state.content} onChange={this.onChange} />
                    </FormGroup>
                    <Button onClick={this.onSave}>Save</Button>
                </Form>
            </div>
        )
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSave() {
        this.setState({
            editable: false
        });
    }

    staticHTML = () => {
        return (
            <div className="profileModule-content">
                <div>
                    <h3 id="name">{this.state.name}</h3>
                </div>
                <div>
                    <h4 id="content">{this.state.content}</h4>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="profileModule-container">
                {
                    this.state.editable ? this.editableHTML() : this.staticHTML()
                }
            </div>
        );
    }
}

ProfileModule.propTypes = {
    quesion: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
}

export default ProfileModule;
