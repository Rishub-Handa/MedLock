import React, { Component } from 'react';
import AveragePDISurvey from './AveragePDISurvey';

import { dispenses, surveys } from './dummyData';
import DispenseScatterData from './DispenseScatterData';
import PDISurveyLineGraph from './PDISurveyLineGraph';

export default class Graphs extends Component {

    render() {
        return (
            <div>
                <PDISurveyLineGraph data={surveys} />
                <AveragePDISurvey data={surveys} />
                <DispenseScatterData data={dispenses} />
            </div>
        )
    }
}
