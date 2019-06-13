import React, { Component } from 'react'; 
import DashIcon from './DashIcon';
import '../../css/Dashboard.css';
import auth0client from '../../auth/Auth';

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
            <div className="icon">
                <DashIcon name={icon.name} content={icon.content} link={icon.link} />
            </div>
        ))
    };

    render() {
        return (
            <div>
                <div className="icon-container"> 
                    {this.iconHTML(this.state.icons)}
                </div>
            </div>
        )
    }
}


export default Dashboard; 
