import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 

class NumInput extends Component {

    onChange = (e) => {
        this.props.onChange(this.props.id, e.target.name, e.target.value); 
    } 

    questionHTML = () => (
        <h3 class="header">{this.props.question}</h3>
    )

    responsesHTML = () => {

        return (
            <form style={{marginBottom: "10px"}} onChange={this.onChange}>
                <input type="number" min={this.props.min} max={this.props.max} name={this.props.question}/> 
            </form>
        )
    }

    render() {
        return (
            <div>
                {this.questionHTML()} 
                {this.responsesHTML()} 
            </div>
        )
    }
}

NumInput.propTypes = {
    id: PropTypes.number.isRequired, 
    question: PropTypes.string.isRequired, 
    min: PropTypes.number.isRequired, 
    max: PropTypes.number.isRequired, 
    onChange: PropTypes.func.isRequired 
}

export default NumInput; 