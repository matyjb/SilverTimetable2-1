import React, { Component } from 'react';
import { Card, CardItem, Text, Body } from 'native-base';
import PropTypes from 'prop-types';
import { Dimensions } from "react-native";
import * as Moment from "moment";

const { width } = Dimensions.get("screen");

export default class EventBlock extends Component {
  render(){
    const { startTime, 
      endTime } = this.props.event;
    const event = this.props.event;
    return (
      <Card>
        <CardItem button onPress={this.props.onPress}> 
          <Body>
            <Text style = {{fontSize: width*0.049}}>{event.name}</Text>

            <Text note style = {{fontSize: width*0.037}}>
              {(event.isFaculty ? "(F) " : "") + event.type + " "}
              {startTime.format("HH:mm ")}
                        - {endTime.format("HH:mm")}
            </Text>

            <Text style = {{fontSize: width*0.037}}>
              {this.props.lecturerMode 
                ? 
                <React.Fragment>
                  {event.room.substr(0, 2) === "Au" || event.room.substr(0, 2) === "au" ? "" : "sala "}
                  {event.room + ((event.department === "WZIM"
                                || event.department === "WZIiM")
                                && event.building !== "34"
                                && event.building !== null
                    ?
                    ", b." + event.building + " "
                    :
                    " ")}
                  <Text note style = {{fontSize: width*0.037}}>{'\n'}{event.fieldOfStudy} rok {event.year} {event.degree}{'\n'}</Text>
                  {(event.groups !== null && event.groups.length > 1) 
                    ? 
                    <Text note style = {{fontSize: width*0.037}}>grupy: {event.groups.join(", ")}</Text>
                    : 
                    <Text note style = {{fontSize: width*0.037}}>grupa: {event.specialization || event.group} </Text> }
                </React.Fragment>
                : 
                <React.Fragment>
                  {event.room + ((event.department === "WZIM"
                                || event.department === "WZIiM")
                                && event.building !== "34"
                                && event.building !== null
                    ?
                    ", b." + event.building + " "
                    :
                    " ")}
                  {event.lecturers[0] !== "" ? <Text note style = {{fontSize: width*0.037}}> - {event.lecturers.join(", ")} </Text> : ""}
                </React.Fragment>
              }
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

EventBlock.propTypes = {
  event: PropTypes.object,
  order: PropTypes.number,
  lecturerMode: PropTypes.bool,
  onPress: PropTypes.func, 
};
