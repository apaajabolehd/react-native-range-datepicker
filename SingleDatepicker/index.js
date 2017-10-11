'use strict'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  InteractionManager,
  Platform,
  ListView,
  StyleSheet,
  Button,
  Dimensions
} from 'react-native';
import Month from './Month';
// import styles from './styles';
import moment from 'moment';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class RangeDatepicker extends Component {
	constructor(props) {
		super(props);

    	this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2});
		this.state = {
			availableDates: props.availableDates || null
		}

		this.onSelectDate = this.onSelectDate.bind(this);
		this.handleRenderRow = this.handleRenderRow.bind(this);
	}

	static defaultProps = {
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
		infoContainerStyle: {marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end'}
	};


	static propTypes = {
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
		infoContainerStyle: PropTypes.object
	}

	componentWillReceiveProps(nextProps) {
		this.setState({availableDates: nextProps.availableDates});
	}

	onSelectDate(date){
		this.props.onSelect(date);
		this.props.onClose();
	}

	getMonthStack(){
		let res = [];
		const { maxMonth, initialMonth } = this.props;
		let initMonth = moment();
		if(initialMonth && initialMonth != '')
			initMonth = moment(initialMonth, 'YYYYMM');

		for(let i = 0; i < maxMonth; i++){
			res.push(initMonth.clone().add(i, 'month').format('YYYYMM'));
		}

		return res;
	}

	handleRenderRow(month) {
		const { selectedBackgroundColor, selectedTextColor, todayColor, ignoreMinDate, minDate, maxDate } = this.props;
		let { availableDates } = this.state;

		if(availableDates && availableDates.length > 0){
			availableDates = availableDates.filter(function(d){
				if(d.indexOf(month) >= 0)
					return true;
			});
		}

		return (
			<Month
				onSelectDate={this.onSelectDate}
				availableDates={availableDates}
				minDate={minDate ? moment(minDate, 'YYYYMMDD') : minDate}
				maxDate={maxDate ? moment(maxDate, 'YYYYMMDD') : maxDate}
				ignoreMinDate={ignoreMinDate}
				dayProps={{selectedBackgroundColor, selectedTextColor, todayColor}}
				month={month} />
		)
	}

	render(){
		const monthStack = this.ds.cloneWithRows(this.getMonthStack());
			return (
				<View style={{backgroundColor: '#fff', zIndex: 1000, alignSelf: 'center'}}>
					{
						this.props.showClose ?
							(<View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20, paddingBottom: 10}}>
								{
									this.props.showClose && <Text style={{fontSize: 20}} onPress={this.props.onClose}>Close</Text>
								}
							</View>)
							:
							null
					}
					{
						this.props.infoText != "" && 
						<View style={this.props.infoContainerStyle}>
							<Text style={this.props.infoStyle}>{this.props.infoText}</Text>
						</View>
					}
					<View style={styles.dayHeader}>
						{
							this.props.dayHeadings.map((day, i) => {
								return (<Text style={{width: DEVICE_WIDTH / 7, textAlign: 'center'}} key={i}>{day}</Text>)
							})
						}
					</View>
					<ListView
			            dataSource={monthStack}
			            renderRow={this.handleRenderRow}
			            initialListSize={1}
			            showsVerticalScrollIndicator={false} />
				</View>
			)
	}
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