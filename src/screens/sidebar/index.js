import React, { Component } from "react";
import {
  Content,
  Footer,
  Text,
  Title,
  Subtitle,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import PropTypes from "prop-types";
import styles from "./style";
import globalProps from "../../globalProps";
import { Row, Grid } from 'react-native-easy-grid';
import { Dimensions, View, Platform } from "react-native"

const { width, height } = Dimensions.get("screen");

const datas = [
  {
    name: "Plan",
    route: "Home",
    icon: "md-calendar",
    bg: "#C5F442"
  },
  {
    name: "Ustawienia",
    route: "Settings",
    icon: "md-settings",
    bg: "#C5F442"
  },
  {
    name: "Schemat piętra",
    route: "FloorPage",
    icon: "md-map",
    bg: "#C5F442"
  },
  {
    name: "O aplikacji",
    route: "AboutPage",
    icon: "md-information-circle",
    bg: "#C5F442"
  }
];

class SideBar extends Component {
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
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Grid>
            <Row style={{ backgroundColor: Platform.OS === "ios" ? "#fafafa" : "#3f51b5", height: Math.max(height, width) * 0.25}}>
              
              <Left style={{ alignSelf: "flex-end", marginLeft: 16, marginBottom: 16 }}>
                <Title style={{fontSize: 21}}>Informatyka (inż)</Title>
                <Subtitle>Stacjonarne, semestr 4</Subtitle>
              </Left>
            </Row>
            {Platform.OS === "ios" &&
            <Row style={{ backgroundColor: "#808080", height: 1 }}></Row>}
            <Row style={{ height: Math.max(height, width) * 0.5 }}>
              <List
                dataArray={datas}
                renderRow={data =>
                  <ListItem
                    button
                    noBorder
                    onPress={() => this.props.navigation.navigate(data.route)}
                  >
                    <Left>
                      <Icon
                        active
                        name={data.icon}
                        style={{ color: "#777", fontSize: 26, width: 30 }}
                      />
                      <Text style={styles.text}>
                        {data.name}
                      </Text>
                    </Left>
                    {data.types &&
                      <Right style={{ flex: 1 }}>
                        <Badge
                          style={{
                            borderRadius: 3,
                            height: 25,
                            width: 72,
                            backgroundColor: data.bg
                          }}
                        >
                          <Text
                            style={styles.badgeText}
                          >{`${data.types} Types`}</Text>
                        </Badge>
                      </Right>}
                  </ListItem>}
              />
            </Row>
          </Grid>
        </Content>
        <View style={{ borderBottomColor: "#808080", borderBottomWidth: 1, marginBottom: 6}} />
        <Text style={styles.footer}>Ostatnia aktualizacja:</Text>
        <Text style={styles.footer}>{globalProps.objs.timetable.date.replace("T", " ").slice(0, 16)}</Text>
      </Container>
    );
  }
}

SideBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SideBar;
