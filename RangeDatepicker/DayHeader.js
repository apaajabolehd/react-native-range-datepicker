'use strict'
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DayHeader = (props) => {
    const {
        dayContainerOffset = 0,
        dayHeaderContainerStyle,
        dayHeaderStyle,
        dayHeadings
    } = props;
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

const styles = StyleSheet.create({
    dayHeader : {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
    }
});

export default DayHeader;