import React, { Component } from 'react'; 
import Header from './DashHeader'; 
import DashIcon from './DashIcon'

class Dashboard extends Component {


    state = {
        icons: [
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
            <DashIcon name={icon.name} content={icon.content} />
        ))
    };

    render() {

        return (
            <div>
                <Header />
                <div className="iconContainer"> 
                    {this.iconHTML(this.state.icons)}
                </div>
            </div>
        )
    }
}


export default Dashboard; 
