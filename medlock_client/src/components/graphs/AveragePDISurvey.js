import React from 'react';
import * as dataForge from 'data-forge';

import { 
    VictoryBar, 
    VictoryChart, 
    VictoryLine, 
    VictoryAxis, 
    VictoryTheme,
    VictoryContainer
 } from 'victory'; 

export const getAveragePDISurveyResponse = (surveys) => {
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

export default function AveragePDISurvey(props) {

    console.log(props.data)
    var avgPDISurvey = getAveragePDISurveyResponse(props.data);

    avgPDISurvey.forEach(response => {
        response.question = response.question.replace(/ /g, "\n");
    });

    console.log(avgPDISurvey);

    return (
        <div>
            <VictoryChart 
                padding={{ left: 80, top: 50, right: 10, bottom: 50 }}
                domainPadding={10}
                height={400}
            >
                
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
