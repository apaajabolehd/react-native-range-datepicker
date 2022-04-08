'use strict'
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import moment from 'moment';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class DayHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            dayContainerOffset = 0,
            dayHeaderContainerStyle,
            dayHeaderStyle,
            dayHeadings
        } = this.props;
        return (
            <View style={[styles.dayHeader, dayHeaderContainerStyle]}>
                {
                    dayHeadings.map((day, i) => {
                        return (
                            <Text style={[ {textAlign: 'center'}, dayHeaderStyle, { width: (DEVICE_WIDTH / 7) - dayContainerOffset} ]} key={i}>
                                {day}
                            </Text>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dayHeader : {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
    }
});