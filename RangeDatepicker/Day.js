'use strict'
import React from 'react';
import {
	View,
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
		let dayStyle = {backgroundColor : 'transparent', position: 'relative', width: "14.28%"};
		let textDayStyle = {color: 'black'};

		switch(day.type){
			case "single" : 
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderRadius: Math.floor(DEVICE_WIDTH / 7), width: "14.28%" }
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "first" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderBottomLeftRadius: Math.floor(DEVICE_WIDTH / 7), borderTopLeftRadius: Math.floor(DEVICE_WIDTH / 7), width: "14.28%" }
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "last" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderBottomRightRadius: Math.floor(DEVICE_WIDTH / 7), borderTopRightRadius: Math.floor(DEVICE_WIDTH / 7), width: "14.28%" }
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "between" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, width: "14.28%"}
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "disabled" :
			case "blockout" :
				textDayStyle = {color: '#ccc'};
			default: break;
		}

		if(day.date){
			if(day.type == 'disabled')
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
						<View style={{...dayStyle, height: 30, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize: 12}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							{day.date == moment().format("YYYYMMDD") ? (<View style={{position: 'absolute', top:0, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: 12, fontWeight: 'bold', color: '#ccc', textAlign: 'center'}}>__</Text></View>) : null}
						</View>
					</TouchableWithoutFeedback>
				);
			else if(day.type == 'blockout') {
				const strikeTop = Math.floor(DEVICE_WIDTH / -22);
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
						<View style={{...dayStyle, height: 30, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize: 12}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							<View style={{position: 'absolute', top: strikeTop, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: 12, color: '#ccc', textAlign: 'center'}}>__</Text></View>
						</View>
					</TouchableWithoutFeedback>
				);
			}
			else
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle} onPress={() => this.props.onSelectDate(moment(day.date, 'YYYYMMDD'))}>
						<View style={{...dayStyle, height:30, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize:12}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							{day.date == moment().format("YYYYMMDD") ? (<View style={{position: 'absolute', top:0, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: 12, fontWeight: 'bold', color: dayProps.selectedBackgroundColor, textAlign: 'center'}}>__</Text></View>) : null}
						</View>
					</TouchableWithoutFeedback>
				);
		}
		else
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{...dayStyle, height: 30, justifyContent: 'center'}}>
						<Text style={{ ...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize: 12}}>{null}</Text>
					</View>
				</TouchableWithoutFeedback>
			);
	}
}
