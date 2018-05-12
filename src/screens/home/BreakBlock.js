import React, { Component } from 'react';
import * as Moment from "moment";
import {View} from "react-native";
import {Text} from "native-base";
import PropTypes from 'prop-types';

export default class BreakBlock extends Component {

    render() {
        const style = {
            textAlign: "center",
            color: "rgb(125,125,125)",
            fontSize: 12,
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
            style.marginTop = 8;
        }
        if (this.props.isEnd) {
            style.paddingBottom = 10;
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
