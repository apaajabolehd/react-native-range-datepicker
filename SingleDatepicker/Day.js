'use strict'
import React, { memo } from 'react';
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import { dayJsMod } from '../helper';


const DEVICE_WIDTH = Dimensions.get('window').width;

const areEqual = (prevProps, nextProps) => {
	return true;
	if(nextProps.day.type != prevProps.day.type){
		return false;
	}

	return true;
};

const Day = memo((props) => {
	let {day, dayProps} = props;
	let dayStyle = {backgroundColor : 'transparent', position: 'relative', width: "14.28%"};
	let textDayStyle = {color: 'black'};

	switch(day.type){
		case "disabled" :
		case "blockout" :
			textDayStyle = {color: '#ccc'};
		default: break;
	}

	if(day.date){
		if(day.type == 'disabled')
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{...dayStyle, height: Math.floor(DEVICE_WIDTH / 7), justifyContent: 'center'}}>
						<Text style={{...textDayStyle, textAlign: "center", width: Math.floor(DEVICE_WIDTH / 7), backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{dayJsMod(day.date, 'YYYYMMDD').date()}</Text>
						{day.date == dayJsMod().format("YYYYMMDD") ? (<View style={{position: 'absolute', top:0, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: Math.floor(DEVICE_WIDTH / 17), fontWeight: 'bold', color: '#ccc', textAlign: 'center'}}>__</Text></View>) : null}
					</View>
				</TouchableWithoutFeedback>
			);
		else if(day.type == 'blockout') {
			const strikeTop = Math.floor(DEVICE_WIDTH / -22);
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{...dayStyle, height: Math.floor(DEVICE_WIDTH / 7), justifyContent: 'center'}}>
						<Text style={{...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{dayJsMod(day.date, 'YYYYMMDD').date()}</Text>
						<View style={{position: 'absolute', top: strikeTop, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: Math.floor(DEVICE_WIDTH / 17), color: '#ccc', textAlign: 'center'}}>__</Text></View>
					</View>
				</TouchableWithoutFeedback>
			);
		}
		else
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle} onPress={() => props.onSelectDate(dayJsMod(day.date, 'YYYYMMDD'))}>
					<View style={{...dayStyle, height: Math.floor(DEVICE_WIDTH / 7), justifyContent: 'center'}}>
						<Text style={{...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{dayJsMod(day.date, 'YYYYMMDD').date()}</Text>
						{day.date == dayJsMod().format("YYYYMMDD") ? (<View style={{position: 'absolute', top:0, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: Math.floor(DEVICE_WIDTH / 17), fontWeight: 'bold', color: dayProps.selectedBackgroundColor, textAlign: 'center'}}>__</Text></View>) : null}
					</View>
				</TouchableWithoutFeedback>
			);
	}
	else
		return (
			<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
				<View style={{...dayStyle, height: Math.floor(DEVICE_WIDTH / 7), justifyContent: 'center'}}>
					<Text style={{ ...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{null}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
}, areEqual)

export default Day;