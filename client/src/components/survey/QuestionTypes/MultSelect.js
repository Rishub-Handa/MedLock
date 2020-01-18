import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 

class MultSelect extends Component {

    state = {
        question: null, 
        responses: [], 
        showOther: false 
    }

    componentDidMount() {
        let responses = this.props.responses.map(response => (
            {
                answer: response, 
                selected: false 
            }
        )); 

        if(this.props.other) {
            responses.push({
                answer: "", 
                type: "other", 
                selected: false 
            })
        }

        this.setState({ responses }); 
    }

    onChange = (e) => { 

        let newResponses = [...this.state.responses]; 

        if(e.target.value == "_other_") {
            this.setState({ showOther: !this.state.showOther }); 
            newResponses.map(response => {
                if(response.type) {
                    response.selected = !response.selected; 
                    response.answer = ""; 
                }
            })
        }

        if(e.target.type == "text") 
            newResponses.map(response => {
                if(response.type) {
                    response.answer = e.target.value; 
                } 
            }) 
        else 
            newResponses.map(response => {
                if(response.answer == e.target.value) 
                    response.selected = !response.selected; 
            })


        this.setState({
            responses: newResponses 
        }); 

        const selectedResponses = newResponses.filter(response => response.selected)
                                                .map(response => response.answer); 
        this.props.onChange(e.target.id, e.target.name, selectedResponses); 
    } 


    questionHTML = () => (
        <h1>{this.props.question}</h1>
    )

    responsesHTML = (other) => {
        return (
            <form onChange={this.onChange}>
                {this.props.responses.map(response => (
                    <div>
                        <p><input name={this.props.question} type="checkbox" value={response} id={this.props.id}/>{response}</p>
                    </div>
                ))}
            {other && (
                <p>
                    <input name={this.props.question} type="checkbox" value="_other_" id={this.props.id}/>
                Other:{this.state.showOther && (<input name={this.props.question} type="text" id={this.props.id} placeholder="Other . . . "/>)}</p>
            )}
            </form>
        );
    }

    render() {
        return (
            <div>
                {this.questionHTML()} 
                {this.responsesHTML(this.props.other)} 
            </div>
        )
    }
}

MultSelect.propTypes = {
    id: PropTypes.number.isRequired, 
    question: PropTypes.string.isRequired, 
    responses: PropTypes.array.isRequired, 
    other: PropTypes.bool.isRequired, 
    onChange: PropTypes.func.isRequired 
}

export default MultSelect; 