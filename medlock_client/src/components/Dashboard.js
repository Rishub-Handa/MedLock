import React, { Component } from 'react'; 
import Header from 'DashHeader.js'; 
import { Data } from './icons'; 

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
        return icons.map(icon => {
            <DashIcon name={icon.name} content={icon.content} />
        })
    }

    render() {

        return (
            <div>
                <Header />
                {iconHTML(dashIcons)}
            </div>
        )
    }
}


export default Dashboard; 
