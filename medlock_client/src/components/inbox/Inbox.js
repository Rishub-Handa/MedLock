import React from 'react';
import MessageList from './components/MessageList'; 
import SendMessageForm from './components/SendMessageForm'; 
import RoomList from './components/RoomList'; 
import NewRoomForm from './components/NewRoomForm'; 
import { tokenUrl, instanceLocator } from './config'; 
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'; 
import { loadProfile } from '../../actions/profileActions'; 
import { connect } from 'react-redux'; 
import auth0client from '../../auth/Auth'; 
import '../../css/Inbox.css'; 

class Inbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [], 
      roomId: null, 
      joinableRooms: [], 
      joinedRooms: [], 
      userId: props.profile.personalData.name 
    };
    console.log(props);
  }
  

  componentDidMount() {    
    // Make a register users module which registers users with Chat Kit and instantiates chats with providers 

    // Create new ChatManager with user and instance 
    const chatManager = new ChatManager({
      instanceLocator, 
      userId: this.state.userId, 
      tokenProvider: new TokenProvider({
        // TokenUrl may point to backend Node Server. How would it interface with ChatKit API ??? 
        url: `http://localhost:5000/api/chatAuth`, 
        queryParams: {
          user_id: this.state.userId 
        }
      })
    }); 
    chatManager.connect({
      onAddedToRoom: room => {
        console.log(`Added to room: ${room.name}`)
      }
    }) 
      .then(currentUser => {
        // CurrentUser is interface to communicate with ChatKit API. 
        this.currentUser = currentUser; 

        this.getRooms(); 

      })
      .catch(error => console.log(error)); 
  } 

  // Connect to room based on sidebar 
  subscribeToRoom = (roomId) => {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoomMultipart({
      roomId, 
      // messageLimit: 100, 
      hooks: {
        onMessage: message => {
          console.log('Message Text: ', message); 
          this.setState({ 
            messages: [...this.state.messages, message]  
          })
        }
      }
    })
      .then(room => {
        this.setState({ roomId: room.id }); 
        this.getRooms(); 
      })
      .catch(error => console.log(error)); 
    }

  // Get all rooms joined and not joined in the session 
  getRooms = () => {
    this.currentUser.getJoinableRooms() 
        .then(joinableRooms => {
          this.setState({
            joinableRooms, 
            joinedRooms: this.currentUser.rooms
          })
        })
        .catch(error => console.log(error)); 
  }

  sendMessage = (text) => {
    this.currentUser.sendSimpleMessage({
      text, 
      roomId: this.state.roomId 
    }); 
  }

  createRoom = (person) => {

    let contains = false; 
    this.currentUser.rooms.forEach(room => {
      if(room.name === this.state.userId + '+' + person) contains = true; 
    })

    if(!contains) {
      this.currentUser.createRoom({ 
        name: this.state.userId + '+' + person, 
        private: true, 
        addUserIds: [person]
      }) 
      .then(room => this.subscribeToRoom(room.id)) 
      .catch(error => console.log(error)); 
    }
  }

  render() {
    return (
      <div className="container">
        <div className="inbox">
          <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    subscribeToRoom={this.subscribeToRoom}
                    roomId={this.state.roomId}
                    userId={this.state.userId}/> 
          <MessageList messages={this.state.messages}
                        roomId={this.state.roomId}/> 
          <SendMessageForm sendMessage={this.sendMessage}
                            disabled={!this.state.roomId}/> 
          <NewRoomForm createRoom={this.createRoom}/> 
        </div>
      </div>
    );
  } 
}

const mapStateToProps = state => ({
  profile: state.profileState.profile 
});

export default connect(mapStateToProps, { loadProfile })(Inbox); 
