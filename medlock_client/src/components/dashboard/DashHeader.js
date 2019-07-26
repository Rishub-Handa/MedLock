import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import UserInfo from './UserInfo';

class DashHeader extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="DashHeader">
                <div className="quote">
                    <p>Some motivational quote</p>
                </div>
                <div className="UserInfo-container">
                    <UserInfo name={this.props.name} />
                </div>
            </div>
        )
    }
}

export default DashHeader; 
