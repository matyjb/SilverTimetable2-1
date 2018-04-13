import React, { Component } from "react";
import { Text, Header, Right, Left, Body, Button, Icon, Title, Container, Content } from "native-base";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import { checkFilter } from "../settings/checkFilter";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      errorWrongFilters: true,
    };
  }

  render() {
    if(this.state.errorWrongFilters){
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
            <Title>Ustawienia</Title>
          </Body>
          <Right />
        </Header>
          <Content contentContainerStyle={{flex:1,justifyContent: 'center'}}>
            <View style={{width: 280,alignItems: "center", alignSelf: "center"}}>
              <Image source={require("./../../../assets/img/unknown.png")} style={{height: 155, width: 155}} resizeMode="contain"/>
              <Text  style={{ width: 280, textAlign: "center"}}>Aby zobaczyć plan proszę spersonalizować ustawienia</Text>
              <Button style={{marginTop: 20, alignSelf: "center"}} onPress={() => this.setState({errorWrongFilters: false})}>
                <Text>Ustaw filtry planu</Text>
              </Button>
            </View>
          </Content>
        </Container>
      );
    }else{
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
            <Title>Ustawienia</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
                Tutaj się pojawi strona z ustawieniami ...
          </Text>
        </Content>
      </Container>
    );
  }
  }
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;