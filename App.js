import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Setup from "./src/boot/setup";
import { Provider } from "react-redux";
import store from "./src/store";

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Setup />
      </Provider>
    );
  }
}