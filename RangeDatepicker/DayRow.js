'use strict'
import React from 'react';
import {
	View
} from 'react-native';
import Day from './Day';

export default class DayRow extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(JSON.stringify(nextProps.days) == JSON.stringify(this.props.days))
			return false;

		return true;
	}

	render() {
		return (
			<View style={{ marginBottom: 2, marginTop: 2, flexDirection: 'row', justifyContent: 'space-evenly', flex: 1}}>
				{
					this.props.days.map((day, i) => {
						return (
							<Day key={i} dayProps={this.props.dayProps} onSelectDate={this.props.onSelectDate} day={day}/>
						)
					})
				}
			</View>
		);
	}
}
