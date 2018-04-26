import React, { Component } from "react";
import { Text } from "react-native";

export default class SettingsItem extends Component {
  render() {
    return <Text> test {this.props.txt} </Text>;
  }
}

export { SettingsItem };
