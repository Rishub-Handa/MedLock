import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import PropTypes from 'prop-types';


// TODO: Style button and toggle functionality 


class AddDispenser extends Component {
    render() {
        return (
            <div id="add-dispenser-btn" onClick={this.props.displayCodeCallback}>
                Add Dispenser
            </div>
        )
    }
}

AddDispenser.propTypes = {
    displayCodeCallback: PropTypes.func.isRequired 
}; 


export default AddDispenser; 