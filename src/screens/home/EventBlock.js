import React, { Component } from 'react';
import { Container,Card, CardItem, Text, Body, Content } from 'native-base';
import PropTypes from 'prop-types';
import * as Moment from "moment";

export default class EventBlock extends Component {
    render(){
        const { startTime, 
                endTime } = this.props.event;
        const event = this.props.event;
        return (
            <Card>
                <CardItem button onPress={this.props.onPress}>
                    <Body>
                        <Text>{event.name}</Text>

                        <Text note>
                        {(event.isFaculty ? "(F) " : "") + event.type + " "}
                        {startTime.format("HH:mm ")}
                        - {endTime.format("HH:mm")}
                        </Text>

                        <Text>
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
                            <Text note>{'\n'}{event.fieldOfStudy} rok {event.year} {event.degree}{'\n'}</Text>
                            {(event.groups !== null && event.groups.length > 1) 
                            ? 
                            <Text note>grupy: {event.groups.join(", ")}</Text>
                            : 
                            <Text note>grupa: {event.specialization || event.group} </Text> }
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
                            {event.lecturers[0] !== "" ? <Text note> - {event.lecturers.join(", ")} </Text> : ""}
                        </React.Fragment>
                        }
                        </Text>
                    </Body>
                </CardItem>
         </Card>
        );
    };
}

EventBlock.propTypes = {
    event: PropTypes.object,
    order: PropTypes.number,
    lecturerMode: PropTypes.bool,
    onPress: PropTypes.func,
  };
