import React, { Component } from 'react'

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

MultChoice.propTypes = {
    id: PropTypes.number.isRequired, 
    question: PropTypes.string.isRequired, 
}

export default TextDirections; 