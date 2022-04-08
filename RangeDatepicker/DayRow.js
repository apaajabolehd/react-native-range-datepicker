'use strict'
import React from 'react';
import {
	View
} from 'react-native';
import Day from './Day';

const DayRow = (props) => {
	return (
		<View style={{ marginBottom: 2, marginTop: 2, flexDirection: 'row', justifyContent: 'space-evenly', flex: 1}}>
			{
				props.days.map((day, i) => {
					return (
						<Day key={i} dayProps={props.dayProps} onSelectDate={props.onSelectDate} day={day} textColor={props.textColor}/>
					)
				})
			}
		</View>
	);
}

export default DayRow;