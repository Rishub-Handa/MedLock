import React from 'react';
import { VictoryChart, VictoryLine, VictoryLabel, VictoryAxis, VictoryLegend } from 'victory';

const colors = {
    "family": "#52ffbc",
    "recreation": "#4ae8d8",
    "social acivity": "5fe4ff",
    "occupation": "#4aa4e8",
    "sexual behavior": "#5287ff",
    "self care": "#5678e8",
    "life support activities": "635eff" 
}

const categories = ["family", "recreation", "social acitivity", "occupation", "sexual behavior", "self care", "life support activities"];

const format = (surveys) => {
    console.log(surveys);
    var data = []
    surveys.forEach(survey => {
        const date = new Date(survey.date);
        survey.responses.forEach(response => {
            const { question, answer } = response;
            const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const formattedAnswer = Number(answer);
            data.push({date: formattedDate, question, answer: formattedAnswer});
        });
    });
    
    var lines = [];
    for(var i = 0; i < 7; i += 1) {
        lines.push(data.filter(response => response.question === data[i].question));
    }
    return lines;
}

const makeLines = (lines) => {
    return lines.map(line => {
        
        var points = [];
        var question;
        line.forEach(point => {
            const { date, answer } = point;
            question = point.question;
            points.push({x: date, y: answer});
        });
        
        return (
            <VictoryLine
                style={{
                    data: { stroke: colors[question] },
                }}
                data={points}
            />
        )
    });
}

export default function PDISurveyLineGraph(props) {

    const lines = format(props.data);
    const dates = lines[0].map(point => point.date);

    return (
        <div>
            <VictoryChart>
                <VictoryLabel 
                    text="PDI Survey Response Over Time"
                    textAnchor="middle"
                    x={225}
                    y={30}
                />
                <VictoryAxis dependentAxis 
                    tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />
                <VictoryAxis 
                    tickValues={dates}
                    tickFormat={date => `${date.getMonth() + 1}-${date.getDate()}`}  
                />
                {makeLines(lines)}
                <VictoryLegend 
                    x={325} y={40}
                    orientation="vertical"
                    itemsPerRow={4}
                    symbolSpacer={5}
                    gutter={0}
                    data={categories.map(category => ({ 
                        name: category, symbol: { fill: colors[category] } 
                    }))}
                    style={{
                        labels: { fontSize: 6}
                    }}
                    labelComponent={<VictoryLabel />}
                />
            </VictoryChart>
        </div>
    )
}
