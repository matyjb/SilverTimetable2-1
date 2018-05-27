import React, { Component } from 'react';
import * as Moment from "moment";
import { Dimensions } from "react-native";
import {Text} from "native-base";
import PropTypes from 'prop-types';

const { width } = Dimensions.get("screen");

export default class BreakBlock extends Component {

  render() {
    const style = {
      textAlign: "center",
      color: "rgb(125,125,125)",
      fontSize: width*0.031,
      paddingBottom: width*0.007,
      paddingTop: width*0.007,
    };
    var text = "";
    if (this.props.isStart) {
      text = "Start " + this.props.startTime.format("HH:mm");
    } else if (this.props.isEnd) {
      text = "Koniec 🎉";
    } else if (this.props.duration < 0) {
      text = "Zajęcia w tym samym czasie";
    } else {
      const tmp = Moment.utc(Moment.duration(this.props.duration, "minutes").asMilliseconds());
      if (tmp.hours() !== 0) {
        text += tmp.hours() + " godz";
      }
      if (tmp.minutes() !== 0) {
        if (text !== "") {
          text += " ";
        }
        text += tmp.minutes() + " min";
      }
      if (tmp.hours() === 0 && tmp.minutes() === 0) {
        text = "brak";
      }
      if (this.props.duration >= 0) {
        text += " przerwy";
      }
    }

    if (this.props.isStart) {
      style.marginTop = width*0.013;
    }
    if (this.props.isEnd) {
      style.marginBottom = width*0.025;
    }
    return (
      <Text style={style}>{text}</Text>
    );
  }
}

BreakBlock.propTypes = {
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  duration: PropTypes.number,
  startTime: PropTypes.object,
};
