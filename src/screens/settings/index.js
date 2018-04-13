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
            <Text style={{width: "150%"}}><Title>Ustawienia</Title></Text>
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