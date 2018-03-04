import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from "./screens/home/";
import SideBar from "./screens/sidebar";
import AboutPage from "./screens/aboutPage";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    AboutPage: { screen: AboutPage }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    AboutPage: { screen: AboutPage }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
