import React, { Component } from 'react'

export default class PersonalDataView extends Component {
    render() {
        const { personalData } = this.props;
        return (
            <div className="PersonalDataView">
                <div className="content">
                    <h4>{personalData.name}</h4>
                    <h6>Bio: {personalData.bio} </h6>
                    <h6>Sex: {personalData.sex}</h6>
                    <h6>Birthday: {personalData.birthday.split('T')[0]}</h6>
                    <h6>Address: {personalData.address.street} {personalData.address.city}, {personalData.address.state} {personalData.address.zip}</h6>
                    <h6>Email: {personalData.email}</h6>
                    <h6>Phone: {personalData.phone}</h6>
                    <h6>Chat Name: {personalData.chatname}</h6>
                </div>
            </div>
        )
    }
}
