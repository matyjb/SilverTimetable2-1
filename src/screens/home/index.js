import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../assets/img/androidSplash/HDPI.png");

class Home extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>SilverTimetable</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>React Native version</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Text>Start!</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
