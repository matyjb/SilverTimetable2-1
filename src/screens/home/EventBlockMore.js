import React, { Component } from "react";
import { Container, Text, H1, Content, Badge } from "native-base";
import {  } from "react-native";
import PropTypes from "prop-types";

export default class EventBlockMore extends Component {
    render() {
    const { startTime, 
        endTime } = this.props.event;
    const event = this.props.event;
    var lecturers = [];
    event.lecturers.forEach((lecturer,index) => {
        lecturers.push(
            <Badge primary key={index} style={{marginVertical: 10}}>
                <Text>{lecturer}</Text>
            </Badge>
        );
    });
    if(this.props.event !== null)
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Content style={{margin: 10}}>
            <H1>{event.name}</H1>
            <Text note>
                {(event.isFaculty ? "(F) " : "") + event.type + " "}
                {startTime.format("HH:mm ")}
                - {endTime.format("HH:mm")}
            </Text>
            {lecturers}
        </Content>
      </Container>
    );
    else 
    return (
        <Container style={{backgroundColor: 'white'}}/>
    );
  }
}


EventBlockMore.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  event: PropTypes.object,
};

