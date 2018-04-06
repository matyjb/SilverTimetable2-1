import React, { Component } from "react";
// import { StyleProvider } from "native-base";

import App from "../App";
// import getTheme from "../theme/components";
// import variables from "../theme/variables/commonColor";
import Expo from "expo";

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }
  
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
    //   <StyleProvider style={getTheme(variables)}>
        <App />
    //   </StyleProvider>
    );
  }
}