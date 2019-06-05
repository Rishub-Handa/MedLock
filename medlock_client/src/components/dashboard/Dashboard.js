import React, { Component } from 'react'; 
import Header from './DashHeader'; 
import DashIcon from './DashIcon';

class Dashboard extends Component {


    state = {
        icons: [
            {
                name: 'Inbox', 
                content: {
                    image: '', 
                    description: 'Access your messages from providers'
                },
                link: '/inbox'
            },
            {
                name: 'My Data',
                content:  {
                    image: '',
                    description: 'View your data'
                },
                link: '/mydata'
            },
            {
                name: 'Resources',
                content: {
                     image: '',
                    description: 'Browse resources that can help you stay sober'

                },
                link: '/resources'
            }
        ]
    }

    iconHTML = icons => {
        return icons.map(icon => (
            <DashIcon name={icon.name} content={icon.content} link={icon.link} />
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
