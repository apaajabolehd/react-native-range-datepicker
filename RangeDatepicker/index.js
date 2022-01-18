'use strict'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import Month from './Month';

import moment from 'moment';
import DayHeader from './DayHeader';

export default class RangeDatepicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: props.startDate && moment(props.startDate, 'YYYYMMDD'),
			untilDate: props.untilDate && moment(props.untilDate, 'YYYYMMDD'),
			availableDates: props.availableDates || null
		}

		this.onSelectDate = this.onSelectDate.bind(this);
		this.onReset = this.onReset.bind(this);
		this.handleConfirmDate = this.handleConfirmDate.bind(this);
		this.handleRenderRow = this.handleRenderRow.bind(this);
	}

	static defaultProps = {
		initialMonth: '',
		dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		dayHeaderStyle: {},
		dayHeaderContainerStyle: {},
		maxMonth: 12,
		buttonColor: 'green',
		buttonContainerStyle: {},
		flatListProps: {},
		monthProps: {},
    buttonText: 'Select Date',
    closeButtonText: 'Close',
    chosenDateTextColor: '#666',
    containerStyle: {},
    dayHeaderDividerColor: "#000000",
		showReset: true,
		showClose: true,
		showConfirmButton: true,
		showSelectedRange: true,
		showsVerticalScrollIndicator: false,
		showDaysHeader: true,
		ignoreMinDate: false,
		dayContainerOffset: 0,
    isHistorical: false,
		onClose: () => {},
		onSelect: () => {},
		onConfirm: () => {},
		placeHolderStart: 'Start Date',
		placeHolderUntil: 'Until Date',
		selectedBackgroundColor: 'green',
		selectedTextColor: 'white',
		dayBackgroundColor: '',
		dayTextColor: '',
		pointBackgroundColor: '',
		pointTextColor: '',
		textColor: '#000000',
		todayColor: 'green',
    resetButtonText: "Reset",
		startDate: '',
		untilDate: '',
		minDate: '',
		maxDate: '',
		infoText: '',
		infoStyle: {color: '#fff', fontSize: 13},
		infoContainerStyle: {marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end'},
		showSelectionInfo: true,
		showButton: true,
		buttonText: 'Select Date',
	};


	static propTypes = {
		initialMonth: PropTypes.string,
		dayHeadings: PropTypes.arrayOf(PropTypes.string),
		availableDates: PropTypes.arrayOf(PropTypes.string),
		maxMonth: PropTypes.number,
		buttonColor: PropTypes.string,
		flatListProps: PropTypes.object,
		dayHeaderStyle: PropTypes.object,
		dayHeaderContainerStyle: PropTypes.object,
		buttonContainerStyle: PropTypes.object,
		monthProps: PropTypes.object,
    buttonText: PropTypes.string, 
		closeButtonText: PropTypes.string,
		chosenDateTextColor: PropTypes.string,
		containerStyle: PropTypes.object,
    dayHeaderDividerColor: PropTypes.string,
		startDate: PropTypes.string,
		untilDate: PropTypes.string,
		minDate: PropTypes.string,
		maxDate: PropTypes.string,
		showReset: PropTypes.bool,
		showClose: PropTypes.bool,
		dayContainerOffset: PropTypes.number,
		showConfirmButton: PropTypes.bool,
		showSelectedRange: PropTypes.bool,
		showsVerticalScrollIndicator: PropTypes.bool,
		ignoreMinDate: PropTypes.bool,
    isHistorical: PropTypes.bool,
		onClose: PropTypes.func,
		onSelect: PropTypes.func,
		onConfirm: PropTypes.func,
		placeHolderStart: PropTypes.string,
		placeHolderUntil: PropTypes.string,
    resetButtonText: PropTypes.string,
		selectedBackgroundColor: PropTypes.string,
		selectedTextColor: PropTypes.string,
		dayBackgroundColor: PropTypes.string,
		dayTextColor: PropTypes.string,
		pointBackgroundColor: PropTypes.string,
		pointTextColor: PropTypes.string,
    textColor: PropTypes.string,
		todayColor: PropTypes.string,
		infoText: PropTypes.string,
		infoStyle: PropTypes.object,
		infoContainerStyle: PropTypes.object,
		showSelectionInfo: PropTypes.bool,
		showButton: PropTypes.bool,
		buttonText: PropTypes.string,
	}

	componentWillReceiveProps(nextProps) {
		this.setState({availableDates: nextProps.availableDates});
	}

	onSelectDate(date){
		let startDate = null;
		let untilDate = null;
		const { availableDates } = this.state;

		if(this.state.startDate && !this.state.untilDate)
		{
			if(date.format('YYYYMMDD') < this.state.startDate.format('YYYYMMDD') || this.isInvalidRange(date)){
				startDate = date;
			}
			else if(date.format('YYYYMMDD') > this.state.startDate.format('YYYYMMDD')){
				startDate = this.state.startDate;
				untilDate = date;
			}
			else{
				startDate = null;
				untilDate = null;
			}
		}
		else if(!this.isInvalidRange(date)) {
			startDate = date;
		}
		else {
			startDate = null;
			untilDate = null;
		}

		this.setState({startDate, untilDate});
		this.props.onSelect(startDate, untilDate);
	}

	isInvalidRange(date) {
		const { startDate, untilDate, availableDates } = this.state;

		if(availableDates && availableDates.length > 0){
			//select endDate condition
			if(startDate && !untilDate) {
				for(let i = startDate.format('YYYYMMDD'); i <= date.format('YYYYMMDD'); i = moment(i, 'YYYYMMDD').add(1, 'days').format('YYYYMMDD')){
					if(availableDates.indexOf(i) == -1 && startDate.format('YYYYMMDD') != i)
						return true;
				}
			}
			//select startDate condition
			else if(availableDates.indexOf(date.format('YYYYMMDD')) == -1)
				return true;
		}

		return false;
	}

	getMonthStack(){
		let res = [];
		const { maxMonth, initialMonth, isHistorical } = this.props;
		let initMonth = moment();
		if(initialMonth && initialMonth != '')
			initMonth = moment(initialMonth, 'YYYYMM');

		for(let i = 0; i < maxMonth; i++){
			res.push(
        !isHistorical ? (
          initMonth.clone().add(i, 'month').format('YYYYMM')
        ) : (
          initMonth.clone().subtract(i, 'month').format('YYYYMM')
        )
      );
		}

		return res;
	}

	onReset(){
		this.setState({
			startDate: null,
			untilDate: null,
		});

		this.props.onSelect(null, null);
	}

	handleConfirmDate(){
		this.props.onConfirm && this.props.onConfirm(this.state.startDate,this.state.untilDate);
	}

	handleRenderRow({item: month, index }) {
		const {
			selectedBackgroundColor,
			selectedTextColor,
			pointTextColor,
			pointBackgroundColor,
			dayBackgroundColor,
			dayTextColor,
			todayColor,
			ignoreMinDate,
			minDate,
			maxDate,
			monthProps,
			dayHeadings,
			dayHeaderStyle,
			dayHeaderContainerStyle,
			dayContainerOffset,
		} = this.props;

		let { availableDates, startDate, untilDate } = this.state;



		if(availableDates && availableDates.length > 0){
			availableDates = availableDates.filter(function(d){
				if(d.indexOf(month) >= 0)
					return true;
			});
		}
		return (
			<Month
				onSelectDate={this.onSelectDate}
				startDate={startDate}
				untilDate={untilDate}
				availableDates={availableDates}
				minDate={minDate ? moment(minDate, 'YYYYMMDD') : minDate}
				maxDate={maxDate ? moment(maxDate, 'YYYYMMDD') : maxDate}
				ignoreMinDate={ignoreMinDate}

				dayProps={{
					dayContainerOffset,
					selectedBackgroundColor,
					selectedTextColor,
					pointTextColor,
					pointBackgroundColor,
					dayBackgroundColor,
					dayTextColor,
					todayColor,
				}}
        textColor={this.props.textColor}
				dayHeaderProps={{dayHeadings, dayHeaderContainerStyle, dayHeaderStyle}}
				month={month}
				{...monthProps} />
		)
	}

	render(){

		const monthStack = this.getMonthStack();

			return (
				<View style={[ {backgroundColor: '#fff', zIndex: 1000, alignSelf: 'center', width: '100%', flex: 1}, this.props.containerStyle ]}>
					{
						this.props.showClose || this.props.showReset ?
							(<View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20, paddingBottom: 10}}>
								{
									this.props.showClose && <Text style={{fontSize: 20, color: this.props.textColor}} onPress={this.props.onClose}>{this.props.closeButtonText}</Text>
								}
								{
									this.props.showReset && <Text style={{fontSize: 20, color: this.props.textColor}} onPress={this.onReset}>{this.props.resetButtonText}</Text>
								}
							</View>)
							:
							null
					}

					{this.props.showSelectedRange && (
						<View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 5, alignItems: 'center'}}>
							<View style={{flex: 1}}>
								<Text style={{fontSize: 34, color: this.props.chosenDateTextColor}}>
									{ this.state.startDate ? moment(this.state.startDate).format("MMM DD YYYY") : this.props.placeHolderStart}
								</Text>
							</View>

							<View style={{}}>
								<Text style={{fontSize: 80, color: this.props.textColor}}>
									/
								</Text>
							</View>

							<View style={{flex: 1}}>
								<Text style={{fontSize: 34, color: this.props.chosenDateTextColor, textAlign: 'right'}}>
									{ this.state.untilDate ? moment(this.state.untilDate).format("MMM DD YYYY") : this.props.placeHolderUntil}
								</Text>
							</View>
						</View>
					)}
          
					{
						this.props.infoText != "" &&
						<View style={this.props.infoContainerStyle}>
							<Text style={this.props.infoStyle}>{this.props.infoText}</Text>
						</View>
					}

					{this.props.showDaysHeader && (
						<DayHeader
							dayHeadings={this.props.dayHeadings}
							dayHeaderStyle={this.props.dayHeaderStyle}
							dayHeaderContainerStyle={this.props.dayHeaderContainerStyle}
							dayContainerOffset={this.props.dayContainerOffset}
						/>
					)}
					<FlatList
						scrollView={{
							scrollEnabled: this.props.showsVerticalScrollIndicator,
						}}
						{...this.props.flatListProps}
						data={monthStack}
						renderItem={this.handleRenderRow}
			        />
					{this.props.showConfirmButton && (
						<View style={[styles.buttonWrapper, this.props.buttonContainerStyle]}>
							<Button
								title={this.props.buttonText}
								onPress={this.handleConfirmDate}
								color={this.props.buttonColor} />
						</View>
					)}
				</View>
			)
	}
}

const styles = StyleSheet.create({
	buttonWrapper : {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderColor: '#ccc',
		alignItems: 'stretch'
	},
});
