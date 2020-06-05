import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { addProfileModule } from '../../actions/profileActions';
import { connect } from 'react-redux';
import '../../css/ProfileModule.css';

import PropTypes from 'prop-types';

class ProfileModule extends Component {
    
    constructor(props) {
        super(props);
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
        console.log("onChange");
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSave = (e) => {
        console.log("onSave");
        this.props.addProfileModule(
            {
                name: this.state.name,
                content: this.state.content
            }
        );
        this.setState({editable: false});
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

    componentDidUpdate() {
        console.log(this.props);
        console.log(this.state);
    }

    render() {

        const { loading } = this.props;
        const { editable } = this.state;

        if (loading) {
            return (
                <div>
                    <div class="loader"></div>
                    <p class="loading-text">Loading...</p>
                </div>
            )
        }

        return (
            <div className="profileModule-container">
                {
                    editable ? this.editableHTML() : this.staticHTML()
                }
            </div>
        );
    }
}

ProfileModule.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
    // saved: PropTypes.bool.isRequired,
    addProfileModule: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    // editable: state.profileState.editable,
    loading: state.profileState.loading
});

export default connect(mapStateToProps, { addProfileModule })(ProfileModule);
