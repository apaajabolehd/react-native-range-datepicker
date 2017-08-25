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
	showReset: true,
	showClose: true,
	ignoreMinDate: false,
	onClose: () => {},
	onSelect: () => {},
	onConfirm: () => {},
	placeHolderStart: 'Start Date',
	placeHolderUntil: 'Until Date',
	selectedBackgroundColor: 'green',
	selectedTextColor: 'white',
	todayColor: 'green',
	startDate: '',
	untilDate: '',
	minDate: '',
	maxDate: '',
	infoText: '',
	infoStyle: {color: '#fff', fontSize: 13},
	infoContainerStyle: {marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end'}
};
```

### Proptypes RangeDatepicker
```jsx
static propTypes = {
	initialMonth: PropTypes.string,
	dayHeadings: PropTypes.arrayOf(React.PropTypes.string),
	availableDates: PropTypes.arrayOf(React.PropTypes.string),
	maxMonth: PropTypes.number,
	buttonColor: PropTypes.string,
	buttonContainerStyle: PropTypes.object,
	startDate: PropTypes.string,
	untilDate: PropTypes.string,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	showReset: PropTypes.bool,
	showClose: PropTypes.bool,
	ignoreMinDate: PropTypes.bool,
	onClose: PropTypes.func,
	onSelect: PropTypes.func,
	onConfirm: PropTypes.func,
	placeHolderStart: PropTypes.string,
	placeHolderUntil: PropTypes.string,
	selectedBackgroundColor: PropTypes.string,
	selectedTextColor: PropTypes.string,
	todayColor: PropTypes.string,
	infoText: PropTypes.string,
	infoStyle: PropTypes.object,
	infoContainerStyle: PropTypes.object
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
	infoContainerStyle: {marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end'}
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
	infoContainerStyle: PropTypes.object
}
```


### New Update
- Available Dates (enable only available date, eg: ["20170620","20170621","20170622","20170623"])
- Min. Date (minimum date, disabled all date before minDate, eg: "20170620")
- Max. Date (maximum date, disabled all date after maxDate, eg: "20170630")
- Ignore Min. Date (ignore minimum date, allow to change startdate even though the selected date is lower than minDate)
- Initial month (first month on calendar, string with 'YYYYMM' format, eg: "201710")
- New component (SingleDatepicker), see above for example


Ok, that's all.

Sorry, if this README is so simple and miss something out, this is my first package after all.

Feel free to use this package and contributors are welcome.
Thank you.
