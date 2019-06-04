import React, { Component } from 'react'; 
import Header from './DashHeader'; 
import DashIcon from './DashIcon'

class Dashboard extends Component {


    state = {
        icons : [
            {
                name: 'Inbox', 
                content: {
                    image: '', 
                    description: 'Access your messages from providers'
                }
            }
        ]
    }

    iconHTML = icons => {
        return icons.map(icon => (
            <p>{icon.name}</p>
        ))
    };

    render() {

        return (
            <div>
                <Header />
                {this.iconHTML(this.state.icons)}
            </div>
        )
    }
}


export default Dashboard; 
