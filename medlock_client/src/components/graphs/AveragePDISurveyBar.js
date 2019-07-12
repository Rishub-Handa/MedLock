import React from 'react';
import * as dataForge from 'data-forge';

import { 
    VictoryBar, 
    VictoryChart, 
    VictoryAxis, 
    VictoryLabel
 } from 'victory'; 

const format = (surveys) => {
    let resArr = [];
    var numSurveys = surveys.length;
    surveys.map(survey => survey.responses)
        .forEach(surveyResponse => 
            surveyResponse.forEach(response => {
                resArr.push(response);
            })
        );

    var df = dataForge.fromJSON(JSON.stringify(resArr));
    var newDf = new dataForge.DataFrame();

    // sums 
    df.forEach(row1 => {
        df.forEach(row2 => {
            if (row1.question === row2.question && row1 !== row2) {

                const newRow = {
                    question: row1.question,
                    answer: Number(row1.answer) + Number(row2.answer)
                }
                newDf = newDf.appendPair([newDf.count() + 1, newRow]);
            } 
        });
    });

    // inefficient, is there a way to determine if a row is already in the dataFrame?
    newDf = newDf.distinct(row => row.question);
    var avgPDISurvey = newDf.select(row => ({ question: row.question, answer: row.answer / numSurveys })).toArray();
    return avgPDISurvey;
};

export default function AveragePDISurveyBar(props) {
    var avgPDISurvey = format(props.data);

    avgPDISurvey.forEach(response => {
        response.question = response.question.replace(/ /g, "\n");
    });

    return (
        <div>
            <VictoryChart 
                padding={{ left: 80, top: 50, right: 10, bottom: 50 }}
                domainPadding={10}
                height={400}
            >
                <VictoryLabel 
                    text="Average PDI Survey Response"
                    textAnchor="middle"
                    x={250} 
                    y={30}
                />
                <VictoryAxis />
                <VictoryAxis dependentAxis
                    tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />

                <VictoryBar 
                    horizontal
                    data={avgPDISurvey}
                    x="question"
                    y="answer"
                />
            </VictoryChart>
        </div>
    )
}
