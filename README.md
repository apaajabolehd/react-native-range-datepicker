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
    onConfirm: {({ startDate, untilDate }) => this.setState({ startDate, untilDate })}
/>
```

### Default props
```jsx
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
```

### Proptypes
```jsx
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
```

Ok, that's all, easy right???

Sorry, if this README is so simple and miss something out, this is my first package after all.

Feel free to use this package and contributors are welcome.
Thank you.
