import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from "./screens/home/";
import Settings from "./screens/settings";
import SideBar from "./screens/sidebar";
import AboutPage from "./screens/aboutPage";
import FloorPage from "./screens/floorPage";
import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("screen");

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    Settings: { screen: Settings },
    AboutPage: { screen: AboutPage },
    FloorPage: { screen: FloorPage }
  },
  {
    initialRouteName: "Home",
    drawerWidth: Math.min(height, width) * 0.7,
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    Home: { screen: Home },
    Settings: { screen: Settings },
    AboutPage: { screen: AboutPage },
    FloorPage: { screen: FloorPage }
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
