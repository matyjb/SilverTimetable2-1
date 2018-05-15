import React, { Component } from "react";
import { Image } from "react-native";
import { Text, Header, Right, Left, Body, Button, Icon, Title, H1,H2,H3, Container, Content, View } from "native-base";
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
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="md-menu" />
            </Button>
          </Left>
          <Body>
            <Text style={{width: "150%"}}><Title>O aplikacji</Title></Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{alignItems: "center" }}>
            <Image source={require("./../../../assets/img/logo.png")} style={{height: 155, width: 155}} resizeMode="contain"/>
            <H1 style={{color: "#4A4A4A", marginTop: 0, marginBottom: 2}}>Plan WZIM</H1>
            <Text align="center">
                  Wersja 1.0.0
            </Text>
            <Text style={{ width: 280, textAlign: "center"}}>
                  Aplikacja stworzona przez członków koła naukowego Silver .NET
            </Text>
            <View style={{marginTop: 10}}>
              <Text style={{ width: 280, textAlign: "center"}}>            
                    Bartosz Matyjasiak{"\n"}
                    Michał Kocisz{"\n"}
                    Paweł Kaczorowski{"\n"}
                    Marcin Lewandowski{"\n"}
                    Maciej Maj{"\n"}
                    Wiktor El Attar
              </Text>
            </View>
            <Image source={require("./../../../assets/img/silver_logo.png")} style={{height: 160, width: 160, marginTop: 10}} resizeMode="contain" />
          </View>
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
