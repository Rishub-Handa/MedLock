import React, { Component } from 'react';
import AveragePDISurvey from './AveragePDISurvey';

import { dispenses, surveys } from './dummyData';
import DispenseScatterData from './DispenseScatterData';
import PDISurveyLineGraph from './PDISurveyLineGraph';
import PDISurveyStack from './PDISurveyStack';

export default class Graphs extends Component {

    render() {
        return (
            <div>
                <PDISurveyLineGraph data={surveys} />
                <AveragePDISurvey data={surveys} />
                <DispenseScatterData data={dispenses} />
                <PDISurveyStack data={surveys} />
            </div>
        )
    }
}
