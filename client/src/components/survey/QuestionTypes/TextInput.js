import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 

class TextInput extends Component {



    state = {
        response: ""
    }



    onChange = (e) => {
        this.setState({ response: e.target.value }); 

        this.props.onChange(this.props.id, this.props.question, e.target.value); 
    }

    responseHTML = () => {

        return (
            <form onChange={this.onChange}>
                <textarea rows="3" col="50" placeholder="Response . . . "></textarea>
            </form>
        )
    }

    questionHTML = () => (
        <h1>{this.props.question}</h1>
    )

    render() {
        return (
            <div>
                {this.questionHTML()} 
                {this.responseHTML()} 
            </div>
        )
    }
}

TextInput.propTypes = {
    id: PropTypes.number.isRequired, 
    question: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired 
}

export default TextInput; 