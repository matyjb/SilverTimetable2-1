import * as Moment from "moment";
import {View} from "react-native";
import PropTypes from 'prop-types';

export default class BreakBlock {

    render() {
        const style = {
            display: "flex",
            justifyContent: "center",
            fontWeight: 500,
            color: "rgb(125,125,125)",
            fontSize: 12,
        };
        let text = "";
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
            <View style={style}>
                {text}
            </View>
        );
    }
}

BreakBlock.propTypes = {
    isStart: PropTypes.bool,
    isEnd: PropTypes.bool,
    duration: PropTypes.number,
    startTime: Moment.Moment,
    key: PropTypes.number,
  };
