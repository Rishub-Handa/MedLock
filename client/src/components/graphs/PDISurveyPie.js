import React, { Component } from 'react'
import { VictoryChart, VictoryPie, VictoryAxis, VictoryLabel } from 'victory';
import { getLinesFromPDISurveys } from './DataFormatter';


const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export default class PDISurveyPie extends Component {
    
    format = (surveys) => {
        const lines = getLinesFromPDISurveys(surveys);
        const data = lines.map((line, index) => {
            var sum = 0;
            line.forEach(point => {
                sum += Number(point.answer);
            });
            if(!line[0]) return {x: 0, y:0};
            else return {x: line[0].question, y: sum};
        });
        return data;
    }

    render() {

        const plottableData = this.format(this.props.data);

        return (
            <div>
                    <VictoryPie
                        // data in the format of {x: "category name", y: "value"}
                        colorScale={colors}
                        radius={100}
                        innerRadius={50}
                        padAngle={3}
                        labels={(d) => {
                            return `${d.x}`;
                        }}
                        // events={[{
                        //     target: "data",
                        //     eventHandlers: {
                        //         onClick: (e) => {
                        //             console.log("clicked!");
                        //             console.log(e);
                        //             return [
                        //                 {
                        //                     target: "data",
                        //                     mutation: (props) => {
                        //                         var fill = props.style && props.style.fill;
                        //                         return fill = "#c43a31" ? null : { style: { fill: "#c43a31" }};
                        //                     }
                        //                 }
                        //             ];
                        //         }
                        //     }
                        // }]}
                        data={plottableData}
                    />
                    
            </div>
        )
    }
}
