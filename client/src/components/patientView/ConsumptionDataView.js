import React, { Component } from 'react';
import DispenseScatter from '../graphs/DispenseScatter';

export default class ConsumptionView extends Component {
    render() {
        return (
            <div className="consumptionDataView-container">
                <div className="title">
                    <h2>Consumption Data</h2>
                </div>
                <div className="consumptionDataView-content">
                    <div>
                        <DispenseScatter data={this.props.data.dispenses} />
                    </div>
                </div>
            </div>
        )
    }
}
