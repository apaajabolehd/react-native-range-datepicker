'use strict'
import React, { Component, PropTypes } from 'react';
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
			startDate: props.startDate && moment(props.startDate, 'DDMMYYYY'),
			untilDate: props.untilDate && moment(props.untilDate, 'DDMMYYYY'),
		}

		this.onSelectDate = this.onSelectDate.bind(this);
		this.onReset = this.onReset.bind(this);
		this.handleConfirmDate = this.handleConfirmDate.bind(this);
		this.handleRenderRow = this.handleRenderRow.bind(this);
	}

	static defaultProps = {
		dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		maxMonth: 12,
		buttonColor: 'green',
		buttonContainerStyle: {},
		showReset: true,
		showClose: true,
		onClose: () => {},
		onConfirm: () => {},
		placeHolderStart: 'Start Date',
		placeHolderUntil: 'Until Date',
		selectedBackgroundColor: 'green',
		selectedTextColor: 'white',
		todayColor: 'green',
		startDate: '',
		untilDate: ''
	};


	static propTypes = {
		dayHeadings: PropTypes.arrayOf(React.PropTypes.string),
		maxMonth: PropTypes.number,
		buttonColor: PropTypes.string,
		buttonContainerStyle: PropTypes.object,
		startDate: PropTypes.string,
		untilDate: PropTypes.string,
		showReset: PropTypes.bool,
		showClose: PropTypes.bool,
		onClose: PropTypes.func,
		onConfirm: PropTypes.func,
		placeHolderStart: PropTypes.string,
		placeHolderUntil: PropTypes.string,
		selectedBackgroundColor: PropTypes.string,
		selectedTextColor: PropTypes.string,
		todayColor: PropTypes.string,
	}

	onSelectDate(date){
		if(!this.state.startDate)
			this.setState({startDate : date});
		else if(!this.state.untilDate)
		{
			if(date.format('YYYYMMDD') > this.state.startDate.format('YYYYMMDD'))
				this.setState({untilDate : date});
			else if(date.format('YYYYMMDD') < this.state.startDate.format('YYYYMMDD'))
				this.setState({untilDate : this.state.startDate, startDate : date});
			else
				this.setState({untilDate : null, startDate : null});
		}
		else{
			// if(date.format('YYYYMMDD') == this.state.startDate.format('YYYYMMDD') || date.format('YYYYMMDD') == this.state.untilDate.format('YYYYMMDD'))
			// 	return;
			// if(Math.abs(date.diff(this.state.startDate, 'days')) == 1)
			// 	this.setState({startDate : date});
			// else if(Math.abs(date.diff(this.state.untilDate, 'days')) == 1)
			// 	this.setState({untilDate : date});
			// else
				this.setState({startDate: date, untilDate : null});
		}
	}

	getMonthStack(){
		let res = [];
		const { maxMonth } = this.props;
		for(let i = 0; i < maxMonth; i++){
			res.push(moment().add(i, 'month').format('YYYYMM'));
		}

		return res;
	}

	onReset(){
		this.setState({
			startDate: null,
			untilDate: null,
		});
	}

	handleConfirmDate(){
		this.props.onConfirm && this.props.onConfirm(this.state.startDate,this.state.untilDate);
	}

	handleRenderRow(month) {
		const { selectedBackgroundColor, selectedTextColor, todayColor } = this.props;
		return (
			<Month
				onSelectDate={this.onSelectDate}
				startDate={this.state.startDate}
				untilDate={this.state.untilDate}
				dayProps={{selectedBackgroundColor, selectedTextColor, todayColor}}
				month={month} />
		)
	}

	render(){
		const monthStack = this.ds.cloneWithRows(this.getMonthStack());

			return (
				<View style={{backgroundColor: '#fff', zIndex: 1000, alignSelf: 'center'}}>
					{
						this.props.showClose || this.props.showReset ?
							(<View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20, paddingBottom: 10}}>
								{
									this.props.showClose && <Text style={{fontSize: 20}} onPress={this.props.onClose}>Close</Text>
								}
								{
									this.props.showReset && <Text style={{fontSize: 20}} onPress={this.onReset}>Reset</Text>
								}
							</View>)
							:
							null
					}
					<View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 20, paddingTop: 0, alignItems: 'center'}}>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 34, color: '#666'}}>
								{ this.state.startDate ? moment(this.state.startDate).format("MMM DD YYYY") : this.props.placeHolderStart}
							</Text>
						</View>

						<View style={{}}>
							<Text style={{fontSize: 80}}>
								/
							</Text>
						</View>

						<View style={{flex: 1}}>
							<Text style={{fontSize: 34, color: '#666', textAlign: 'right'}}>
								{ this.state.untilDate ? moment(this.state.untilDate).format("MMM DD YYYY") : this.props.placeHolderUntil}
							</Text>
						</View>
					</View>
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
					<View style={[styles.buttonWrapper, this.props.buttonContainerStyle]}>
						<Button
							title="Select Date" 
							onPress={this.handleConfirmDate}
							color={this.props.buttonColor} />
					</View>
				</View>
			)
	}
}

const styles = StyleSheet.create({
	dayHeader : { 
		flexDirection: 'row', 
		borderBottomWidth: 1, 
		paddingBottom: 10
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