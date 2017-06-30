'use strict'
import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import moment from 'moment';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Day extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.day.type == this.props.day.type)
			return false;

		return true;
	}

	render() {
		let {day, dayProps} = this.props;
		let dayStyle = {backgroundColor : 'transparent'};
		let textDayStyle = {color: 'black'};
		let todayDateStyle = {color: dayProps.todayColor};

		switch(day.type){
			case "single" : 
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderRadius: Math.floor(DEVICE_WIDTH / 7) }
				textDayStyle = {color: dayProps.selectedTextColor};
				todayDateStyle = {color: dayProps.selectedTextColor};
				break;
			case "first" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderBottomLeftRadius: Math.floor(DEVICE_WIDTH / 7), borderTopLeftRadius: Math.floor(DEVICE_WIDTH / 7) }
				textDayStyle = {color: dayProps.selectedTextColor};
				todayDateStyle = {color: dayProps.selectedTextColor};
				break;
			case "last" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderBottomRightRadius: Math.floor(DEVICE_WIDTH / 7), borderTopRightRadius: Math.floor(DEVICE_WIDTH / 7) }
				textDayStyle = {color: dayProps.selectedTextColor};
				todayDateStyle = {color: dayProps.selectedTextColor};
				break;
			case "between" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor}
				textDayStyle = {color: dayProps.selectedTextColor};
				todayDateStyle = {color: dayProps.selectedTextColor};
				break;
			case "disabled" :
				textDayStyle = {color: '#ccc'};
			default: break;
		}

		if(day.date == moment().format("YYYYMMDD"))
			todayDateStyle.fontWeight = 'bold';

		if(day.date){
			if(day.type == 'disabled')
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
						<View style={{...dayStyle, height: Math.floor(DEVICE_WIDTH / 7), justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", width: Math.floor(DEVICE_WIDTH / 7), backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
						</View>
					</TouchableWithoutFeedback>
				);
			else
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle} onPress={() => this.props.onSelectDate(moment(day.date, 'YYYYMMDD'))}>
						<View style={{...dayStyle, height: Math.floor(DEVICE_WIDTH / 7), justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", width: Math.floor(DEVICE_WIDTH / 7), backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
						</View>
					</TouchableWithoutFeedback>
				);
		}
		else
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{...dayStyle, height: Math.floor(DEVICE_WIDTH / 7), justifyContent: 'center'}}>
						<Text style={{ ...textDayStyle, textAlign: "center", width: Math.floor(DEVICE_WIDTH / 7), backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{null}</Text>
					</View>
				</TouchableWithoutFeedback>
			);
	}
}
