import React, { Component } from "react";
import { Image, ImageBackground, Dimensions, View, ScrollView } from "react-native";
import { Header, Right, Left, Body, Button, Icon, Title, Text, Container, Content } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPinned, setPinRoom } from "../../actions";
import styles from "./style";
import Coords from "./Coords";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class FloorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFloorPagePictureLoaded: true,
      isPinnedState: false,
      X: null,
      Y: null,
    };
  }

  componentWillMount() {
    if (this.props.isPinned && this.props.pinRoom) {
      let coords;
      try {
        coords = Coords.getCoords(this.props.pinRoom);
      } catch (e) {
        coords = false;
      }
      if (coords) {
        this.setState({
          ...this.state,
          X: deviceWidth*(Number(coords.X)/100),
          Y: deviceHeight*(Number(coords.Y)/100),
          isPinnedState: this.props.isPinned,
        });
      }
      this.props.setPinned(false);
      this.props.setPinRoom(null);
    }
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
          <ScrollView
            maximumZoomScale={2}
            minimumZoomScale={1}
          >
            <ImageBackground style={styles.background}
              source={ require("../../../assets/wzim.png" ) } 
              imageStyle={{resizeMode: "stretch"}}>
              <View>
                { this.state.isPinnedState && this.state.X && this.state.Y 
                && <Image style={styles.pin} left={this.state.X} top={this.state.Y} 
                  source={require("../../../assets/img/pin.png" )} />
                }
              </View>
            </ImageBackground>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isPinned: state.pinMap.isPinned,
    pinRoom: state.pinMap.pinRoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPinned: (value) => dispatch(setPinned(value)),
    setPinRoom: (room) => dispatch(setPinRoom(room)),
  };
};

FloorPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isPinned: PropTypes.bool,
  setPinned: PropTypes.func,
  pinRoom: PropTypes.string,
  setPinRoom: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FloorPage);
  