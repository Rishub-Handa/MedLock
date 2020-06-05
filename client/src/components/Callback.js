import React, { Component } from 'react';

class Callback extends Component {
    render() {
        return (
            // <div>
            //     <img src={''} alt="loading..." />
            // </div>
            <div>
                <div class="loader"></div> 
                <p class="loading-text">Loading...</p>
            </div>
        )
    }
}

export default Callback;
