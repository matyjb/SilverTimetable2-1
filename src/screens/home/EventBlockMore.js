import React, { Component } from "react";
import { Container, Text } from "native-base";
import {  } from "react-native";
import PropTypes from "prop-types";

export default class EventBlockMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
          event: this.props.event,
        };
      }
  render() {
    if(this.props.event !== null)
    return (
      <Container style={{backgroundColor: 'white'}}>
          <Text>{this.props.event.name}</Text>
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

