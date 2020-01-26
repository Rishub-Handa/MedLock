import React, { Component } from 'react';

export default class SummaryStats extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <p>{`Average Pills Per Day: ${this.averagePillsPerDay()}`}</p>
                <p>{`Days Met Prescription: ${this.daysMetPrescription()}`}</p>
            </div>
        )
    }

    averagePillsPerDay = () => {
        var dispense_dates = this.props.data.dispenses.map(timestamp => {
            const date = new Date(timestamp);
            return date;
        });
        console.log(dispense_dates);

        var num_pills = dispense_dates.length;
        console.log(num_pills);
        var num_days = 0;
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
        console.log(num_days);
        var avgPillsPerDay = num_pills / num_days;
        return avgPillsPerDay;
    }

    daysMetPrescription = () => {
        return 4;
    }
}
