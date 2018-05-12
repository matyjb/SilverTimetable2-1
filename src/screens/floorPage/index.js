import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
import { Header, Right, Left, Body, Button, Icon, Title, Text, Container, Content } from "native-base";
import PropTypes from "prop-types";
import styles from "./style";

class FloorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFloorPagePictureLoaded: true
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
            <Text style={{width: "150%"}}><Title>Schemat piętra</Title></Text>
          </Body>
          <Right />
        </Header>
        <Content>
          { this.getFloorPicture() }
        </Content>
      </Container>
    );
  }

  getFloorPicture() {
    const height = Dimensions.get("window").height;

    if (height > 2560) {
      return  <Image style={styles.canvas} source={require("../../../assets/img/2784x5226.png" )} resizeMode="stretch" />;
    }
    if (height <= 2560 && height > 1920) {
      return  <Image style={styles.canvas} source={require("../../../assets/img/1364x2560.png" )} resizeMode="stretch" />;
    }
    if (height <= 1920 && height > 1280) {
      return  <Image style={styles.canvas} source={require("../../../assets/img/1023x1920.png" )} resizeMode="stretch" />;
    }
    if (height <= 1280 && height > 800) {
      return  <Image style={styles.canvas} source={require("../../../assets/img/682x1280.png" )} resizeMode="stretch" />;
    }
    if (height <= 800 && height > 480) {
      return  <Image style={styles.canvas} source={require("../../../assets/img/426x800.png" )} resizeMode="stretch" />;
    }
    if (height <= 480) {
      return  <Image style={styles.canvas} source={require("../../../assets/img/256x480.png" )} resizeMode="stretch" />;
    }

    this.setState({
      isFloorPagePictureLoaded: false
    });
    return  <Image style={{width: 100, height: 100, alignSelf: "center", margin: 15}} source={require("../../../assets/img/unknown.png" )} />;
  }
}

FloorPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
  
export default FloorPage;
  