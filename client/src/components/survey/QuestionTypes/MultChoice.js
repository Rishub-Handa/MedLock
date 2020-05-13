import React, { Component } from 'react'; 
import PropTypes from 'prop-types'; 

class MultChoice extends Component {

    state = {
        question: null, 
        answer: null, 
        showOther: false, 
    } 

    onChange = (e) => { 
        if(e.target.value == "_other_") {
            this.setState({ showOther: !this.state.showOther }); 
        } 
        else {
            this.setState({
                id: e.target.id, 
                question: e.target.name, 
                answer: e.target.value
            })

            this.props.onChange(e.target.id, e.target.name, e.target.value); 
        }
    } 


    questionHTML = () => (
        <h3 class="header">
            {this.props.question} 
        </h3>
    ); 

    responsesHTML = (other) => {
        
        return (
            <form style={{marginBottom: "10px"}} onChange={this.onChange}>
                {this.props.responses.map(answer => (
                    <div>
                        <p><input name={this.props.question} type="radio" value={answer} id={this.props.id}/>{answer}</p>
                    </div>
                ))}
            {other && (
                <p>
                    <input name={this.props.question} type="radio" value="_other_" id={this.props.id}/>
                Other:{this.state.showOther && (<input name={this.props.question} type="text" id={this.props.id} placeholder="Other . . . "/>)}</p>
            )}
            </form>
        ); 
        
        
    } 


    componentDidMount() {
        console.log(this.props); 
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

MultChoice.propTypes = {
    id: PropTypes.number.isRequired, 
    question: PropTypes.string.isRequired, 
    responses: PropTypes.array.isRequired, 
    other: PropTypes.bool.isRequired, 
    onChange: PropTypes.func.isRequired 
}


export default MultChoice; 