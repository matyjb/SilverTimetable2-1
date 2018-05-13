import React, { Component } from "react";
import {
  Content,
  Text,
  Title,
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
import { Row, Grid } from 'react-native-easy-grid';
import { Dimensions, View, Platform } from "react-native"
import { connect } from "react-redux";

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
          style={styles.content}
        >
          <Grid>
            <Row style={styles.row}>
              
              <Left style={styles.left}>
                { this.props.timetableData && 
                this.props.configuration.lecturerMode && this.props.filters.lecturer &&
                <Text><Title style={styles.sidebarTitleLecturer}>{this.props.filters.lecturer}</Title></Text> }

                {this.props.timetableData &&
                !this.props.configuration.lecturerMode && this.props.filters.fieldOfStudy && this.props.filters.fieldOfStudy &&
                  this.props.filters.degree && this.props.filters.mode && this.props.filters.semester &&
                  <View>
                    <Text><Title style={styles.sidebarTitleField}>{this.props.filters.fieldOfStudy} ({this.props.filters.degree})</Title></Text>
                    <Text><Title style={styles.sidebarTitleSemester}>{this.props.filters.mode}, semestr {this.props.filters.semester}</Title></Text>
                  </View>
                }
                 
              </Left>
            </Row>
            {Platform.OS === "ios" &&
            <Row style={{ borderBottomColor: "#808080", borderBottomWidth: 1 }}></Row>}
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
                        style={styles.icon}
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
        {this.props.timetableData &&
        <View>
          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, marginBottom: 6}} />
          <Text style={styles.footer}>Ostatnia aktualizacja:</Text>
          <Text style={styles.footer}>{this.getDate(this.props.timetableData.date)}</Text>
        </View>}
      </Container>
    );
  }

  getDate(date) {
    var setDate = date.replace("T", " ").slice(0, 16);
    return setDate;
  }
}

SideBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  timetableData: PropTypes.object,
  configuration: PropTypes.object,
  filters: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    timetableData: state.timetable.data,
    filters: state.configuration.filters,
    configuration: state.configuration
  };
};

export default connect(mapStateToProps)(SideBar);
