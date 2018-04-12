import React, { Component } from "react";
import { Text, Header, Right, Left, Body, Button, Icon, Title, Container, Content, Card, CardItem } from "native-base";
import PropTypes from "prop-types";

class ErrorPage extends Component {
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
        <Header iosBarStyle="light-content" backgroundColor="#3f51b5" androidStatusBarColor="#3f51b5" Left>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Błąd</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{}}>
          <Icon name="md-construct" style={{ fontSize: 120, color: "#686868", alignSelf: "center", marginTop: 150 }} />
          <Text style={{ alignSelf: "center" }}>brak internetu</Text>
        </Content>
      </Container>
    );
  }
}

ErrorPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default ErrorPage;
