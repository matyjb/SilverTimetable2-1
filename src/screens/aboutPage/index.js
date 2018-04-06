import React, { Component } from "react";
import { Image } from "react-native";
import { Text, Header, Right, Left, Body, Button, Icon, Title, H1,H2,H3, Container, Content } from "native-base";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

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
              <Title>O aplikacji</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Container style={{ alignSelf: "center", alignItems: "center", height: "100%"}}>
              <Image source={require("./../../../assets/img/logo.png")} style={{height: 155, width: 155}} resizeMode="contain"/>
              <H1 style={{color: "#4A4A4A", marginTop: 0, marginBottom: 2}}>Plan WZIM</H1>
              <Text align="center">
                  Wersja 1.0.6
              </Text>
              <Text style={{ width: 280, textAlign: "center"}}>
                  Aplikacja stworzona przez członków koła naukowego Silver .NET
              </Text>
              <Image source={require("./../../../assets/img/silver_logo.png")} style={{height: 160, width: 160}} resizeMode="contain" />
            </Container>
          </Content>
        </Container>
    );
  }
}

export default AboutPage;