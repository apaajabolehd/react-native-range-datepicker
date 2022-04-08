'use strict'
import React, { memo } from 'react';
import {
	View,
	Text
} from 'react-native';
import DayRow from './DayRow'
import { dayJsMod } from '../helper'

const areEqual = (prevProps, nextProps) => {
	if(nextProps.minDate != prevProps.minDate)
		return false;

	if(nextProps.maxDate != prevProps.maxDate)
		return false;

	if(nextProps.availableDates != prevProps.availableDates)
		return false;

	if(nextProps.startDate != prevProps.startDate)
		return false;

	if(nextProps.untilDate != prevProps.untilDate)
		return false;
		
	return true;
}


const Month = memo((props) => {
	const { month, dayProps, onSelectDate } = props;

	const getDayStack = (month) => {
		let res = [];
		let currMonth = dayJsMod(month).month(); //get this month
		let currDate = dayJsMod(month).startOf("month"); //get first day in this month

		let dayColumn = [];
		let dayRow = [];
		let dayObject = {};
		let {startDate, untilDate, availableDates, minDate, maxDate, ignoreMinDate} = props;

		do{
			dayColumn = [];
			for(let i = 0; i < 7; i++){
				dayObject = {
					type : null,
					date: null
				};
				if(i == currDate.day() && currDate.month() == currMonth)
				{
					if(minDate && minDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") < minDate.format("YYYYMMDD")){
						if(startDate && startDate.format('YYYYMMDD') > currDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") > dayJsMod().format("YYYYMMDD") && ignoreMinDate){}
						else{
							dayObject.type = 'disabled';
						}
					}
					if(maxDate && maxDate.format("YYYYMMDD") && currDate.format("YYYYMMDD") > maxDate.format("YYYYMMDD")){
						dayObject.type = 'disabled';
					}
					if(availableDates && availableDates.indexOf(currDate.format("YYYYMMDD")) == -1){
						dayObject.type = 'blockout';
					}
					if(startDate && startDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')){
						if(!untilDate){
							dayObject.type = 'single';
						}
						else{
							dayObject.type = 'first';
						}
					}
					if(untilDate && untilDate.format('YYYYMMDD') == currDate.format('YYYYMMDD')){
						dayObject.type = 'last';
					}
					if((startDate && startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD')) && 
						(untilDate && untilDate.format('YYYYMMDD') > currDate.format('YYYYMMDD')))
						dayObject.type = 'between';

					dayObject.date = currDate.clone().format('YYYYMMDD');
					dayColumn.push(dayObject);
					currDate = currDate.add(1, 'day');
				}
				else {
					if(startDate && untilDate &&
						(
							startDate.format('YYYYMMDD') < currDate.format('YYYYMMDD')  && 
							untilDate.format('YYYYMMDD') >= currDate.format('YYYYMMDD')
						)
					)
						dayObject.type = 'between';

					dayColumn.push(dayObject);
				}
			}

			dayRow.push(dayColumn);
		} while (currDate.month() == currMonth);

		return dayRow;
	}

	const dayStack = getDayStack(dayJsMod(month, 'YYYYMM'));

	return (
		<View>
			<Text style={{fontSize: 14, padding: 14}}>{dayJsMod(month, 'YYYYMM').format("MMMM YYYY")}</Text>
			<View>
				{
					dayStack.map((days, i) => {
						return (
							<DayRow days={days} dayProps={dayProps} key={i} onSelectDate={onSelectDate}/>
						)
					})
				}
			</View>
		</View>
	);
}, areEqual)


export default Month;