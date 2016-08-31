import formatTime from 'minutes-seconds-milliseconds'
import React, {Component} from 'react'
import { View, Text, AppRegistry, StyleSheet, TouchableHighlight } from 'react-native'

class StopWatch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeElapsed: null,
			running: false,
			startTime: null
		}
	}
	render() {
		return (
			<View style={style.container}>
				<View style={[style.header, this.border('yellow')]}>
					<View style={[this.border('red'), style.timerWrapper]}>
						<Text style={style.timer}>
							{formatTime(this.state.timeElapsed)}
						</Text>
					</View>
					<View style={[this.border('green'), style.buttonWrapper]}>
						{this.startStopButton()}
						{this.lapButton()}
					</View>
				</View>
				<View style={[style.footer, this.border('blue')]}>
					<Text>
						I am a list of Laps
					</Text>
				</View>
			</View>
		)
	}
	startStopButton() {
		var styles = this.state.running ? style.stopButton : style.startButton;

		return <TouchableHighlight 
		underlayColor="gray"
		onPress={this.handleStartPress.bind(this)}
		style={[style.button, styles]}>
			<Text>
				{this.state.running ? "Stop" : "Start" }
			</Text>
		</TouchableHighlight>
	}
	lapButton() {
		return <TouchableHighlight
		underlayColor="gray"
		onPress={this.handleLapPress.bind(this)}
		style={style.button}>
			<Text>
				Lap
			</Text>
		</TouchableHighlight>
	}
	border(color) {
		return {
			borderColor: color,
			borderWidth: 4
		}
	}
	handleStartPress() {
		if (this.state.running) {
			clearInterval(this.interval);
			this.setState({
				running: false
			})
			return
		}
		this.setState({startTime: new Date()})
		this.interval = setInterval(() => {
			this.setState({
				timeElapsed: new Date() - this.state.startTime,
				running: true
			});
		}, 30);
	}
	handleLapPress() {
		var lap = this.state.timeElapsed;

		if (this.state.running) {
			this.setState({
				startTime: new Date()
			})
			console.log(formatTime(lap));
			return
		}
	}
}

var style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch'
	},
	header: {
		flex: 1
	},
	footer: {
		flex: 1
	},
	timerWrapper: { // Red
		flex: 5, // takes up 5/8th of the available space
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonWrapper: { // Green
		flex: 3, // takes up 3/8th of the available space
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	timer: {
		color: 'red',
		fontSize: 50
	},
	button: {
		borderWidth: 2,
		height: 100,
		width: 100,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	startButton: {
		borderColor: '#00CC00'
	},
	stopButton: {
		borderColor: '#CC0000'
	},
	lapButton: {
		borderColor: '#FFF'
	}
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
