import React, { Component } from 'react'

class NewRoomForm extends Component { 

    state = {
        roomName: ''
    }

    onChange = (e) => {
        this.setState({ 
            roomName: e.target.value 
        })
    } 

    onSubmit = (e) => {
        e.preventDefault(); 
        this.props.createRoom(this.state.roomName); 
    }


    render() {
        return (
            <div className="new-room-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                            value={this.state.roomName}
                            placeholder="NewRoomForm"
                            onChange={this.onChange}
                            required /> 
                    <button id="create-room-btn" type="submit">+</button>
                </form>
            </div>
        )
    }
}
export default NewRoomForm; 