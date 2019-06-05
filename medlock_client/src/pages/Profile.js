import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../nav/SideBar';
import DashHeader from '../components/dashboard/DashHeader';
import PersonalInfo from '../components/PersonalInfo';
import '../css/Profile.css';



class Profile extends Component {

    render() {
        return (
            <div className="profile-container">
                <div className="leftSideBar">
                    <SideBar />  
                </div>
                <div className="main">
                    <div>
                        <PersonalInfo uid=''/>
                    </div>
                    <div>
                        <p>Ut ullamco deserunt occaecat cillum laborum consectetur commodo minim exercitation fugiat. Ullamco cupidatat excepteur deserunt irure elit proident. Adipisicing ea aute dolor ad aute dolor culpa. Est ipsum enim proident dolor irure cupidatat anim quis ad enim. Dolore id ad aliqua officia in sit officia aute excepteur. Magna nostrud dolor nulla ut nisi.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
