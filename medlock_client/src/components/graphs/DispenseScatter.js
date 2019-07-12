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
export default function DispenseScatter(props) {
    
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
                    padding={{}}
                />

                <VictoryAxis 
                    label="Date"
                    tickValues={data.map(pair => pair.x)}
                    tickFormat={(x) => {
                        var date = new Date(x);
                        return `${date.getMonth()}-${date.getDate()}`;
                    }}
                    
                />

                <VictoryAxis dependentAxis
                    domain={[0, 1440]}
                    tickValues={[0, 180, 360, 540, 720, 900, 1080, 1260, 1440]}
                    tickFormat={(x) =>{
                        const hour = Math.floor(x/60);
                        return `${hour}:00`;
                    }}
                    //padding={100}
                />

                <VictoryScatter 
                    data={data}
                />
            </VictoryChart>
        </div>
    )
}
