import React, { Component } from 'react';
import PDISurveyBar from '../graphs/PDISurveyBar';
import DateTimeScatter from '../graphs/DateTimeScatter';

export default class DataView extends Component {
    /**
     * props should contain an object data with fields: allPDISurveys, dispenses, btn1, btn2, and btn3.
     */

    constructor(props) {
        super(props);
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
        const { pdisurveys, dispenses, btn1, btn2, btn3 } = this.props.data;
        if (pdisurveys && dispenses) {
            return (
                <div className="pd-body">
                    <PDISurveyBar id="g0" data={pdisurveys} />
                    <DateTimeScatter 
                        id="g1"
                        title="Button Presses" 
                        data={[btn1, btn2, btn3]} 
                        colors={["red", "blue", "green"]}
                    />
                    <DateTimeScatter 
                        id="g2"
                        title="Dispenses"
                        data={[dispenses]}
                        colors={["var(--medlock-blue)"]}
                    />
                </div>
            )
        } else if (pdisurveys) {
            return (
                <div className="pd-body">
                    <PDISurveyBar id="g0" data={pdisurveys} />
                </div>
            )
        } else if (dispenses) {
            return (
                <div className="pd-body">
                    <DateTimeScatter 
                        id="g1"
                        title="Button Presses" 
                        data={[btn1, btn2, btn3]} 
                        colors={["red", "blue", "green"]}
                    />
                    <DateTimeScatter 
                        id="g2"
                        title="Dispenses"
                        data={[dispenses]}
                        colors={["var(--medlock-blue)"]}
                    />
                </div>
            )
        } else return ( <h2>There are no data at the moment.</h2> )
    }

    render() {
        return this.displayGraphs();
    }
}
