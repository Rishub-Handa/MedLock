import React, { Component } from 'react'

class SendMessageForm extends Component {

    state = {
        message: '' 
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    onSubmit = (e) => {
        e.preventDefault(); 
        this.props.sendMessage(this.state.message); 
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form className="send-message-form"
                    onSubmit={this.onSubmit}>
                <input placeholder="Type your message and press ENTER. " 
                        value={this.state.message}
                        type="text" 
                        name="message"
                        onChange={this.onChange}
                        disabled={this.props.disabled}/> 
            </form>
        )
    }
} 
export default SendMessageForm; 