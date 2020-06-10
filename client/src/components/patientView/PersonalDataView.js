import React, { Component } from 'react'

export default class PersonalDataView extends Component {
    render() {
        const { personalData } = this.props;
        return (
            <div className="personalDataView-container">
                <div className="content">
                    <h4>{personalData.name}</h4>
                    <h6>Bio: <span style={{color: "var(--medlock-dark-gray)"}}> {personalData.bio} </span></h6>
                    <h6>Sex: <span style={{color: "var(--medlock-dark-gray)"}}> {personalData.sex} </span></h6>
                    <h6>Birthday: <span style={{color: "var(--medlock-dark-gray)"}}> {personalData.birthday != null ? personalData.birthday.split('T')[0] : null} </span></h6>
                    <h6>Address: <span style={{color: "var(--medlock-dark-gray)"}}> {personalData.address.street} {personalData.address.city}, {personalData.address.state} {personalData.address.zip} </span></h6>
                    <h6>Email: <span style={{color: "var(--medlock-dark-gray)"}}> {personalData.email} </span></h6>
                    <h6>Phone: <span style={{color: "var(--medlock-dark-gray)"}}> {personalData.phone} </span></h6>
                    <h6>Chat Name: <span style={{color: "var(--medlock-dark-gray)"}}> {personalData.chatname} </span></h6>
                </div>
            </div>
        )
    }
}
