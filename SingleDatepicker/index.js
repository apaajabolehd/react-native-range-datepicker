'use strict'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import Month from './Month';
// import styles from './styles';
import { dayJsMod } from '../helper';

const SingleDatepicker = (props) => {
	const [availableDates, setAvailableDates] = useState(props.availableDates || null)

	useEffect(() => {
		setAvailableDates(props.availableDates);
	}, [props.availableDates])
	
	
	const onSelectDate = (date) => {
		props.onSelect(date);
		props.onClose();
	}

	const getMonthStack = () => {
		let res = [];
		const { maxMonth, initialMonth } = props;
		let initMonth = dayJsMod();
		if(initialMonth && initialMonth != '')
			initMonth = dayJsMod(initialMonth, 'YYYYMM');

		for(let i = 0; i < maxMonth; i++){
			res.push(initMonth.clone().add(i, 'month').format('YYYYMM'));
		}

		return res;
	}

	const handleRenderRow = (month, index) => {
		const { selectedBackgroundColor, selectedTextColor, todayColor, ignoreMinDate, minDate, maxDate } = props;

		if(availableDates && availableDates.length > 0){
			availableDates = availableDates.filter(function(d){
				if(d.indexOf(month) >= 0)
					return true;
			});
		}

		return (
			<Month
				onSelectDate={onSelectDate}
				availableDates={availableDates}
				minDate={minDate ? dayJsMod(minDate, 'YYYYMMDD') : minDate}
				maxDate={maxDate ? dayJsMod(maxDate, 'YYYYMMDD') : maxDate}
				ignoreMinDate={ignoreMinDate}
				dayProps={{selectedBackgroundColor, selectedTextColor, todayColor}}
				month={month} />
		)
	}

	return (
		<View style={{backgroundColor: '#fff', zIndex: 1000, alignSelf: 'center'}}>
			{
				props.showClose ?
					(<View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20, paddingBottom: 10}}>
						{
							props.showClose && <Text style={{fontSize: 20}} onPress={props.onClose}>Close</Text>
						}
					</View>)
					:
					null
			}
			{
				props.infoText != "" && 
				<View style={props.infoContainerStyle}>
					<Text style={props.infoStyle}>{props.infoText}</Text>
				</View>
			}
			<View style={styles.dayHeader}>
				{
					props.dayHeadings.map((day, i) => {
						return (<Text style={{width: "14.28%", textAlign: 'center'}} key={i}>{day}</Text>)
					})
				}
			</View>
			<FlatList
				data={getMonthStack()}
				renderItem={ ({item, index}) => { 
					return handleRenderRow(item, index)
				}}
				keyExtractor = { (item, index) => index.toString() }
				showsVerticalScrollIndicator={false}
				/>
		</View>
	)
}

SingleDatepicker.defaultProps = {
	initialMonth: '',
	dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	maxMonth: 12,
	showClose: true,
	onClose: () => {},
	onSelect: () => {},
	selectedBackgroundColor: 'green',
	selectedTextColor: 'white',
	todayColor: 'green',
	minDate: '',
	maxDate: '',
	infoText: '',
	infoStyle: {color: '#fff', fontSize: 13},
	infoContainerStyle: {marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end'},
};


SingleDatepicker.propTypes = {
	initialMonth: PropTypes.string,
	dayHeadings: PropTypes.arrayOf(PropTypes.string),
	availableDates: PropTypes.arrayOf(PropTypes.string),
	maxMonth: PropTypes.number,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	showClose: PropTypes.bool,
	onClose: PropTypes.func,
	onSelect: PropTypes.func,
	selectedBackgroundColor: PropTypes.string,
	selectedTextColor: PropTypes.string,
	todayColor: PropTypes.string,
	infoText: PropTypes.string,
	infoStyle: PropTypes.object,
	infoContainerStyle: PropTypes.object,
}

const styles = StyleSheet.create({
	dayHeader : { 
		flexDirection: 'row', 
		borderBottomWidth: 1, 
		paddingBottom: 10,
		paddingTop: 10,
	},
	buttonWrapper : {
		paddingVertical: 10, 
		paddingHorizontal: 15, 
		backgroundColor: 'white', 
		borderTopWidth: 1, 
		borderColor: '#ccc',
		alignItems: 'stretch'
	},
});

export default SingleDatepicker;