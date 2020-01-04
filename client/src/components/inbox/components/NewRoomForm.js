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
        if(this.state.roomName) 
            this.props.createRoom(this.state.roomName); 
    }


    render() {
        return (
            <div className="new-room-form">
                <form onSubmit={this.onSubmit}> 
                    <select name="Talk to..." onChange={this.onChange} value={this.state.roomName}>
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value="physician">Physician</option>
                        <option value="pharmacist">Pharmacist</option>
                        <option value="caretaker">Caretaker</option>
                    </select>
                    <button id="create-room-btn" type="submit">+</button>
                </form>
            </div>
        )
    }
}
export default NewRoomForm; 