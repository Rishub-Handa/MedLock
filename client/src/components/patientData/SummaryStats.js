import React, { Component } from 'react';

export default class SummaryStats extends Component {
    render() {
        return (
            <div class="SummaryStats">
                <p>Average Pills Per Day: <span>{this.averagePillsPerDay()}</span></p>
                <p>Days Met Prescription: <span>{this.daysMetPrescription()}</span></p>
                <p>Collar Off Count: <span>{this.collarOffCount()}</span></p>
                <p>Last Updated: <span>{this.getLastUpdated()}</span></p>
            </div>
        )
    }

    averagePillsPerDay = () => {
        var dispense_dates = this.props.data.dispenses.map(timestamp => {
            const date = new Date(timestamp);
            return date;
        });

        var num_pills = dispense_dates.length;
        var num_days = 1;
        for(var i = 0; i < dispense_dates.length - 1; i++) {
            var j = i + 1;
            var date1 = dispense_dates[i];
            var date2 = dispense_dates[j];
            if ((date1.getFullYear() != date2.getFullYear()) ||
                (date1.getMonth() != date2.getMonth()) ||
                (date1.getDate() != date2.getDate())) {
                    num_days++;
                } 
        }
        var avgPillsPerDay = num_pills / num_days;
        return avgPillsPerDay.toFixed(2);
    }

    collarOffCount = () => {
        return this.props.data.collarOff.length;
    }

    daysMetPrescription = () => {
        return 4;
    }

    getLastUpdated = () => {
        const { dispenses, btn1, btn2, btn3, collarOff } = this.props.data;
        var arr1 = dispenses.concat(btn1);
        var arr2 = btn2.concat(btn3).concat(collarOff);
        var flatData = [].concat(arr1).concat(arr2).map(timestamp => {
            console.log(timestamp);
            var date = new Date(timestamp);
            return date;
        }).sort((a, b) => {
            return a.getTime() - b.getTime();
        });
        
        var lastUpdated = flatData[flatData.length - 1];
        console.log(lastUpdated);
        return lastUpdated.toString();
    }
}
