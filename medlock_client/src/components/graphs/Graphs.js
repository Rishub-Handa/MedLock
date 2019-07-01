import React, { Component } from 'react';
import AveragePDISurvey, { getAveragePDISurveyResponse } from './AveragePDISurvey';

import { dispenses, surveys } from './dummyData';
import { formatWithOptions } from 'util';

export default class Graphs extends Component {

    render() {
        return (
            <div>
                <AveragePDISurvey data={surveys} />
            </div>
        )
    }
}
