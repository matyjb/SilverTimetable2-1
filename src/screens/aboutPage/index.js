import React, { Component } from "react";
import { Image } from "react-native";
import { Text, Header, Right, Left, Body, Button, Icon, Title, H1,H2,H3, Container, Content } from "native-base";
import PropTypes from "prop-types";

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
        <Header iosBarStyle='light-content' backgroundColor='#3f51b5' androidStatusBarColor='#3f51b5' Left>
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
          <Container style={{ alignSelf: "center", alignItems: "center" }}>
            <Image source={require("./../../../assets/img/logo.png")} style={{flex:1, height: 155, width: 155}} resizeMode="contain"/>
            <H1 style={{color: "#4A4A4A", marginTop: 0, marginBottom: 2}}>Plan WZIM</H1>
            <Text align="center">
                  Wersja 1.0.6
            </Text>
            <Text style={{ width: 280, textAlign: "center"}}>
                  Aplikacja stworzona przez członków koła naukowego Silver .NET
            </Text>
            <Image source={require("./../../../assets/img/silver_logo.png")} style={{flex:1, height: 160, width: 160, marginTop: 10}} resizeMode="contain" />
          </Container>
        </Content>
      </Container>
    );
  }
}

AboutPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AboutPage;
