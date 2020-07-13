import React, { Component } from 'react';
import PDISurveyBar from '../graphs/PDISurveyBar';
import DateTimeScatter from '../graphs/DateTimeScatter';
import '../../css/DataView.css';

export default class DataView extends Component {
    /**
     * props should contain an object data with fields: allPDISurveys, dispenses, btn1, btn2, and btn3.
     */

    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state = {
            graph_id: 0,
        }
    }

    graphs = ["PDI Surveys, Dispenses, Button Presses"];


    onSelectChange = (e) => {
        this.setState({
            graph_id: e.target.value,
        });
    }

    graphSelect() {
        return (
            <select onChange={this.onSelectChange}>
                {this.graphs.map((name, i) => {
                        if (i == this.state.graph_id)
                            return <option selected="selected" value={i}>{name}</option>
                        return <option value={i}>{name}</option>
                    })
                }
            </select>
        )
    }

    displayGraphs() {
        const { pdisurveys } = this.props.data;
        const { dispenses, btn1, btn2, btn3, collarOff } = this.props.data.events;
        
        // true when pdisurveys is a valid array of nonzero length
        // sometimes pdisurveys will be an empty array, so it's defined but there are no 
        // surveys which causes issues
        var someSurveys = (pdisurveys) && (pdisurveys.length > 0);

        if (someSurveys && dispenses) { // data for both pdisurveys and dispenses are available
            return (
                <div className="DataView">
                    <DateTimeScatter 
                        id="g0"
                        title="Dispenser Events" 
                        data={[dispenses, btn1, btn2, btn3, collarOff]} 
                        buttonMeaning={this.props.dispenser.info.buttonMeaning}
                        colors={["var(--medlock-blue)", "red", "yellow", "green", "black"]}
                    />
                    <PDISurveyBar id="g1" data={pdisurveys} />
                </div>
            );
        } else if (someSurveys) { // only data for pdisurveys are available
            return (
                <div className="DataView">
                    <PDISurveyBar id="g0" data={pdisurveys} />
                </div>
            );
        } else if (dispenses) { // only data for dispenses are available
            return (
                <div className="DataView">
                    <DateTimeScatter 
                        id="g0"
                        title="Dispenser Events" 
                        data={[dispenses, btn1, btn2, btn3, collarOff]} 
                        buttonMeaning={this.props.dispenser.info.buttonMeaning}
                        colors={["var(--medlock-blue)", "green", "yellow", "red", "black"]}
                    />
                </div>
            );
        } else return ( <h2>There are no data at the moment.</h2> );
    }

    render() {
        return this.displayGraphs();
    }
}
