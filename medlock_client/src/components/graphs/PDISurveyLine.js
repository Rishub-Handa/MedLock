import React from 'react';
import { VictoryChart, VictoryLine, VictoryLabel, VictoryAxis, VictoryLegend } from 'victory';

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
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
    return lines.map((line, index) => {
        
        var points = [];
        var question;
        line.forEach(point => {
            const { date, answer } = point;
            question = point.question;
            points.push({x: date, y: answer});
        });
        console.log(points);
        return (
            <VictoryLine
                style={{
                    data: { stroke: colors[index] },
                }}
                data={points}
            />
        )
    });
}

export default function PDISurveyLine(props) {
    console.log("PROPS.DATA:" + props.data);
    const lines = format(props.data);
    const dates = lines[0].map(point => point.date);
    console.log("DATES:" + dates);
    if(dates[0])
    {
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
                        data={categories.map((category, index) => ({ 
                            name: category, symbol: { fill: colors[index] } 
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
    else
    {
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
                        //tickFormat={date => `${date.getMonth() + 1}-${date.getDate()}`}  
                    />
                    {makeLines(lines)}
                    <VictoryLegend 
                        x={325} y={40}
                        orientation="vertical"
                        itemsPerRow={4}
                        symbolSpacer={5}
                        gutter={0}
                        data={categories.map((category, index) => ({ 
                            name: category, symbol: { fill: colors[index] } 
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
}
