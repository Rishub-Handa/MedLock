import React, { Component } from 'react';
import AveragePDISurveyBar from '../graphs/AveragePDISurveyBar';
import PDISurveyPie from '../graphs/PDISurveyPie';
import PDISurveyLine from '../graphs/PDISurveyLine';
import PDISurveyStack from '../graphs/PDISurveyStack';

export default class MedicalDataView extends Component {
    render() {
        const { pdiSurveys } = this.props.data;
        return (
            <div className="medicalDataView-container">
                <div className="title">
                    <h2>Medical Data</h2>
                </div>
                <div className="content">
                    <div>
                        <AveragePDISurveyBar data={pdiSurveys} />
                    </div>
                    <div>
                        <PDISurveyPie data={pdiSurveys} />
                    </div>
                    <div>
                        <PDISurveyLine data={pdiSurveys} />
                    </div>
                    <div>
                        <PDISurveyStack data={pdiSurveys} />
                    </div>
                </div>
            </div>
        )
    }
}
