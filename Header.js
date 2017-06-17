
import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class Header extends Component {
	render(){
		<View style={{padding: 10}}>
			<Text style={{fontSize: 20, selfAlign: 'left'}}>X</Text>
			<Text style={{fontSize: 20, selfAlign: 'right'}}>Reset</Text>
		</View>
	}
}