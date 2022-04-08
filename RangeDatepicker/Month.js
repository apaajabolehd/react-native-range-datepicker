'use strict'
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text
} from 'react-native';
import DayRow from './DayRow';
import DayHeader from './DayHeader';
import { dayJsMod } from '../helper'

function capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

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
	const { month, dayProps, titleStyle, titleFormat, capitalizeTitle, dayHeaderProps } = props;

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
						if(!untilDate)
							dayObject.type = 'single';
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
				else{
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
			<Text style={{color: props.textColor, ...titleStyle}}>
				{capitalizeTitle ?
					capitalize(dayJsMod(month, 'YYYYMM').format(titleFormat)) :
					dayJsMod(month, 'YYYYMM').format(titleFormat)
				}
			</Text>
			{props.showDaysHeader && (
				<DayHeader {...dayHeaderProps} />
			)}
			<View>
				{
					dayStack.map((days, i) => {
						return (
							<DayRow days={days} dayProps={dayProps} key={i} onSelectDate={props.onSelectDate} textColor={props.textColor}/>
						)
					})
				}
			</View>
		</View>
	);
}, areEqual);

Month.defaultProps = {
	titleFormat: 'MMMM YYYY',
	titleStyle: { fontSize: 20, padding: 20 },
	dayHeaderProps: {},
	showDaysHeader: false,
	capitalizeTitle: false,
};

Month.propTypes = {
	titleFormat: PropTypes.string,
	titleStyle: PropTypes.object,
	dayHeaderProps: PropTypes.object,
	showDaysHeader:  PropTypes.bool,
	capitalizeTitle:  PropTypes.bool,
};

export default Month;