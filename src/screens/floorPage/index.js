import React, { Component } from "react";
import { Image, ScrollView} from "react-native";
import { Header, Right, Left, Body, Button, Icon, Title, Text, Container, Content } from "native-base";
import PictureOfFloor from "./../../../assets/img/floor.png";
import PropTypes from "prop-types";
import styles from "./style";

class FloorPage extends Component {
  constructor(props) {
    super(props);
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
          <ScrollView>
            <Image style={styles.canvas} source={PictureOfFloor} resizeMode="stretch" />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

FloorPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
  
export default FloorPage;
  