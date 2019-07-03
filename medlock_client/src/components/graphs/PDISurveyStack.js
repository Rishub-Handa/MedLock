import React, { Component } from 'react';
import {
    VictoryStack,
    VictoryArea,
    VictoryLabel,
    VictoryAxis,
    VictoryChart,
    VictoryLegend
} from 'victory';

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
const categories = ["family", "recreation", "social acitivity", "occupation", "sexual behavior", "self care", "life support activities"];

export default class PDISurveyStack extends Component {

    format = (surveys) => {
        var data = []
        surveys.forEach(survey => {
            const date = new Date(survey.date);
            survey.responses.forEach(response => {
                const {
                    question,
                    answer
                } = response;
                const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                const formattedAnswer = Number(answer);
                data.push({
                    date: formattedDate,
                    question,
                    answer: formattedAnswer
                });
            });
        });

        var lines = [];
        for (var i = 0; i < 7; i += 1) {
            lines.push(data.filter(response => response.question === data[i].question));
        }
        return lines;
    }

    makeStacks = (lines) => {
        console.log(lines);
        return lines.map((line, index) => {
            var points = [];
            var question;
            line.forEach((point, index) => {
                const { date, answer } = point;
                question = point.question;
                points.push({x: date, y: answer});
            });

            console.log(points);
            return (
                <VictoryArea 
                    style={{ data: { fill: colors[index] } }}
                    data={points}
                />
            );
        })
    }

    render() {
        const lines = this.format(this.props.data);
        const dates = lines[0].map(point => point.date);
        console.log(dates);

        return ( 
            <div>

                <VictoryChart>
                    <VictoryLabel
                        text="Aggregate PDI Survey Response Over Time"
                        textAnchor="middle"
                        x={225}
                        y={30}
                    />
                    <VictoryStack>
                        {this.makeStacks(lines)}
                    </VictoryStack>
                    <VictoryAxis 
                        tickValues={dates}
                        tickFormat={date => `${date.getMonth() + 1}-${date.getDate()}`}
                    />
                    <VictoryAxis 
                        dependentAxis
                        tickValues={0, 10, 20, 30, 40, 50, 60, 70}
                    />
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