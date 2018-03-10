import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Colors from '../constants/Colors'

export default class CalendarEvent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      date: this.parseDate(this.props.event.start_time),
      start: '',
      end: '',
      name: this.props.event.name,
      place: this.props.event.place
    }

    this.parseTime = this.parseTime.bind(this)
  }

  componentWillMount () {
    this.parseTime(this.props.event.start_time, this.props.event.end_time)
  }

  fixDate (date) {
    var position = date.length - 2
    date = date.substr(0, position) + ':' + date.substr(position)

    return date
  }

  parseDate (date) {
    date = this.fixDate(date)
    var newDate = (new Date(date))
    // For some reason, months are zero indexed...
    var month = newDate.getMonth() + 1
    var day = newDate.getDate()

    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }

    var parsedDate = month + '/' + day

    return parsedDate
  }

  parseDateObj (dateObj) {
    let time
    var hours
    var minutes
    if (dateObj.getHours() > 12) {
      hours = dateObj.getHours() - 12
      if (dateObj.getMinutes() < 10) {
        minutes = '0' + dateObj.getMinutes()
        time = hours + ':' + minutes + 'PM'
      } else {
        minutes = dateObj.getMinutes()
        time = hours + ':' + minutes + 'PM'
      }
    } else if (dateObj.getHours() === 0) {
      hours = '12'
      if (dateObj.getMinutes() < 10) {
        minutes = '0' + dateObj.getMinutes()
        time = hours + ':' + minutes + 'AM'
      } else {
        minutes = dateObj.getMinutes()
        time = hours + ':' + minutes + 'AM'
      }
    } else if (dateObj.getHours() === 12) {
      hours = '12'
      if (dateObj.getMinutes() < 10) {
        minutes = '0' + dateObj.getMinutes()
        time = hours + ':' + minutes + 'PM'
      } else {
        minutes = dateObj.getMinutes()
        time = hours + ':' + minutes + 'PM'
      }
    } else {
      hours = dateObj.getHours()
      if (dateObj.getMinutes() < 10) {
        minutes = '0' + dateObj.getMinutes()
        time = hours + ':' + minutes + 'AM'
      } else {
        minutes = dateObj.getMinutes()
        time = hours + ':' + minutes + 'AM'
      }
    }

    return time
  }

  parseTime (startDate, endDate) {
    startDate = this.fixDate(startDate)
    endDate = this.fixDate(endDate)

    var startDateObj = new Date(startDate)
    var endDateObj = new Date(endDate)

    var startTime = this.parseDateObj(startDateObj)
    var endTime = this.parseDateObj(endDateObj)

    this.setState({
      start: startTime,
      end: endTime
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.date}>{this.state.date}</Text>
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{this.state.name}</Text>
          <Text>{this.state.place}</Text>
          <Text>{this.state.start} - {this.state.end}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    margin: 15,
    borderRadius: 10
  },
  date: {
    padding: 40,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: Colors.steelBlue,
    color: 'whitesmoke',
    fontWeight: 'bold',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  eventInfo: {
    padding: 20,
    marginLeft: 10,
    flexDirection: 'column'
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 16
  }
})
