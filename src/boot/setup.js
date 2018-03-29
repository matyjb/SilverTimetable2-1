import React, { Component } from "react";
import { StyleProvider } from "native-base";

import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import Expo from "expo";
import globalProps from "../globalProps";

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataFetched: null,

    };
  }

  async componentWillMount() {
    await this.getFonts();
    await this.fetchData();
    this.setState({ loading: false });
  }

  async getFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
  }

  async fetchData() {
    const response = await fetch("https://silvertimetable.azurewebsites.net/api/timetable/date");
    console.log("fetching data ...");
    try {
      const json = await response.json();
      this.setState({
        dataFetched: json
      })
      globalProps.timetable = json;
      console.log(this.state.dataFetched);
    } catch(e) {
      console.log("error parsing data. ", e);
    }
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <App />
      </StyleProvider>
    );
  }
}
