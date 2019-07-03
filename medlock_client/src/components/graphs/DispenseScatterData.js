import React from 'react';
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel } from 'victory';
 
const format = (dispenses) => {

    var data = [];

    dispenses.forEach(timestamp => {
        var newDate = new Date(timestamp);
        data.push({x: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()), y: newDate.getHours() * 60 + newDate.getMinutes()})
    });

    return data;
}
export default function DispenseScatterData(props) {
    
    const data = format(props.data);
    console.log(data);
    const x_values = data.map(pair => pair.x);

    return (
        <div>
            <VictoryChart scale={{x: "time"}}>

                <VictoryLabel 
                    text="Dispense Times"
                    textAnchor="middle"
                    x={225} 
                    y={30}
                />

                <VictoryAxis 
                    tickValues={data.map(pair => pair.x)}
                    tickFormat={(x) => {
                        var date = new Date(x);
                        return `${date.getMonth()}-${date.getDate()}`;
                    }}
                />

                <VictoryAxis dependentAxis
                    tickValues={data.map(pair => pair.y)}
                    tickFormat={(x) =>{
                        const hour = Math.floor(x/60);
                        const minutes = x % 60;
                        return `${hour}:${minutes}`;
                    }}
                />

                <VictoryScatter 
                    data={data}
                />
            </VictoryChart>
        </div>
    )
}
