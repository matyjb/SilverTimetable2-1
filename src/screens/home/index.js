import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Content, Button, Body, Header, Icon, Title, Right, Left, Text } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../assets/img/androidSplash/HDPI.png");

class Home extends Component {
  render() {
    return (
      <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ width: 150 }}>Plan zajęć WZIiM</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>MainPage</Text>
                </Content>
            </Container>
    );
  }
}

export default Home;
