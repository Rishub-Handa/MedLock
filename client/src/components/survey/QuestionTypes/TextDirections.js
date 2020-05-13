import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 

class TextDirections extends Component {

    textHTML = () => (

        <h3>{this.props.question}</h3>

    )

    render() {
        return (
            <div>
                {this.textHTML()}
            </div>
        )
    }
}

TextDirections.propTypes = {
    id: PropTypes.number.isRequired, 
    question: PropTypes.string.isRequired, 
}

export default TextDirections; 