import React, { Component } from 'react'; 
import '../../css/Dashboard.css'
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { addDispenserCode } from '../../actions/profileActions'; 

class DispenserCode extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true, 
            code: [], 
            codeString: ""
        }

    }

    componentDidMount() {

        let numArray = []; 
        const arraySize = 6; 

        for(let i = 0; i < arraySize; i++) {
            numArray[i] = Math.floor((Math.random() * 3)); 
        }

        let codeString = ""; 
        numArray.forEach(num => {
            switch(num) {
                case 0:     
                    codeString += "Green "
                    break; 
                case 1: 
                    codeString += "Yellow "
                    break; 
                case 2: 
                    codeString += "Red "
                    break; 
                default:  
                    break; 
            }
        })

        this.props.addDispenserCode(numArray) 
            .then(() => { 
                console.log("Returned Code Adding. "); 
                console.log(this.props.code); 
                console.log(this.props.codeAdding); 
                console.log(this.props.codeAddedError); 
                if(this.props.code) {
                    this.setState({
                        code: numArray, 
                        codeString 
                    })
                }
            }); 

        

        console.log(numArray); 

        // Generate Random Code 
        // Update Database 
        // Display Code 
    }

    render() {

        console.log(this.props.code); 
        console.log(this.props.codeAdding); 
        console.log(this.props.codeAddedError); 

        if(this.props.codeAdding) {
            return (
                <div className="DispenserCode">
                    Loading . . . 
                    <button onClick={this.props.hideDispenserCode}>Done</button>

                </div>
            ); 
        } 

        if(this.props.codeAddedError) {
            return (
                <div className="DispenserCode">
                    Error: {String(this.props.codeAddedError)}
                    <button onClick={this.props.hideDispenserCode}>Done</button>

                </div>
            ); 
        }

        return (
            <div className="DispenserCode">
                Dispenser Code: <i>{this.state.codeString} </i>
                <button onClick={this.props.hideDispenserCode}>Done</button>
            </div>
        ); 
        
    }
}

DispenserCode.propTypes = {
    hideDispenserCode: PropTypes.func.isRequired, 
    addDispenserCode: PropTypes.func.isRequired, 
    profile: PropTypes.object.isRequired, 
    code: PropTypes.array.isRequired,
    codeAdding: PropTypes.bool.isRequired,
    codeAddedError: PropTypes.string,
}

const mapStateToProps = state => ({
    code: state.profileState.code,
    codeAdding: state.profileState.codeAdding,
    codeAddedError: state.profileState.codeAddedError,
});

export default connect(mapStateToProps, { 
    addDispenserCode
})(DispenserCode); 