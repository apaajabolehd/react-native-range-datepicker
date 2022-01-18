# react-native-range-datepicker

This is my first npm package, inspired by Airbnb datepicker.

![react-native-range-datepicker in action](https://raw.githubusercontent.com/apaajabolehd/react-native-range-datepicker/master/demo-datepicker.gif)

### Install
```sh
$ npm i react-native-range-datepicker --save
```

### How to use
```jsx
import DatepickerRange from 'react-native-range-datepicker';

<DatepickerRange
    startDate: '13052017',
    untilDate: '26062017',
    onConfirm: {( startDate, untilDate ) => this.setState({ startDate, untilDate })}
/>
```


### Default props RangeDatepicker
```jsx
static defaultProps = {
        initialMonth: '',
        dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        maxMonth: 12,
        buttonColor: 'green',
        buttonContainerStyle: {},
        buttonText: 'Select Date',
        closeButtonText: 'Close',
        chosenDateTextColor: '#666',
        containerStyle: {},
        dayHeaderDividerColor: "#000000",
        showReset: true,
        showClose: true,
        ignoreMinDate: false,
        isHistorical: false,
        onClose: () => {},
        onSelect: () => {},
        onConfirm: () => {},
        placeHolderStart: 'Start Date',
        placeHolderUntil: 'Until Date',
        selectedBackgroundColor: 'green',
        selectedTextColor: 'white',
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
};
```

### Proptypes RangeDatepicker
```jsx
static propTypes = {
        initialMonth: PropTypes.string,
        dayHeadings: PropTypes.arrayOf(PropTypes.string),
        availableDates: PropTypes.arrayOf(PropTypes.string),
        maxMonth: PropTypes.number,
        buttonColor: PropTypes.string,
        buttonContainerStyle: PropTypes.object,
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
        textColor: PropTypes.string,
        todayColor: PropTypes.string,
        infoText: PropTypes.string,
        infoStyle: PropTypes.object,
        infoContainerStyle: PropTypes.object,
        showSelectionInfo: PropTypes.bool,
        showButton: PropTypes.bool,
}

```



```jsx
import {SingleDatepicker} from 'react-native-range-datepicker';

<SingleDatepicker
    onConfirm: {( date ) => this.setState({ date })}
/>
```


### Default props SingleDatepicker
```jsx
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
	infoContainerStyle: {marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end'},
};
```

### Proptypes SingleDatepicker
```jsx
static propTypes = {
	initialMonth: PropTypes.string,
	dayHeadings: PropTypes.arrayOf(React.PropTypes.string),
	availableDates: PropTypes.arrayOf(React.PropTypes.string),
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
```

### Update 23/07/2019
* RN 0.6 compatibility: replaced ListView by FlatList
* added more flexible width based on actual container size
