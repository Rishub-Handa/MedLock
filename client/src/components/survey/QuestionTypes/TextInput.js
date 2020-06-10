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
            <form style={{marginBottom: "10px"}} onChange={this.onChange}>
                <textarea style={{padding: "5px", width: "100%"}}rows="3" col="50" placeholder=" Response . . . "></textarea>
            </form>
        )
    }

    questionHTML = () => (
        <h3 class="header">{this.props.question}</h3>
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