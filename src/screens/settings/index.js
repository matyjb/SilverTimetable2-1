import React, { Component } from "react";
import { Text, Header, Right, Left, Body, Button, Icon, Title, Container, Content } from "native-base";
import PropTypes from "prop-types";

class Settings extends Component {
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

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;