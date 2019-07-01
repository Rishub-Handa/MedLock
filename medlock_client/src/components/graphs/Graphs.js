import React, { Component } from 'react';
import AveragePDISurvey from './AveragePDISurvey';

import { dispenses, surveys } from './dummyData';
import DispenseScatterData from './DispenseScatterData';

export default class Graphs extends Component {

    render() {
        return (
            <div>
                <AveragePDISurvey data={surveys} />
                <DispenseScatterData data={dispenses} />
            </div>
        )
    }
}
