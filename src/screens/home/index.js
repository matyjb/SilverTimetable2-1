import React, { Component } from "react";
import { Container, Content, Button, Body, Header, Icon, Title, Right, Left, Text, Tabs, Tab, ScrollableTab } from "native-base";
import { AppState, Dimensions } from "react-native";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { setFiltersOK } from "../../actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }
 
  componentWillMount() {
    console.log("Checking filters...");
    this.checkValidFilters();
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
    
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
    
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="md-menu" />
            </Button>
          </Left>
          <Body>
            <Text style={{width: "150%"}}><Title>Plan zajęć WZIM</Title></Text>
          </Body>
          <Right />
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab />} style={{backgroundColor: '#3f51b5'}}>
          {this.renderDayTabs(this.filter)}
        </Tabs>
        <Content>
          <Text>Tutaj pojawi się plan</Text>
        </Content>
      </Container>
    );
  }

  renderDayTabs(filter) {
    if (filter.isLecturerMode) {
        return [
            <Tab heading="Pn" key={0}/>,
            <Tab heading="Wt" key={1}/>,
            <Tab heading="Śr" key={2}/>,
            <Tab heading="Czw" key={3}/>,
            <Tab heading="Pt" key={4}/>,
            <Tab heading="So" key={5}/>,
            <Tab heading="Nd" key={6}/>,
        ];
    }
    if (filter.mode === "Stacjonarne") {
        return [
            <Tab heading="Pn" key={0}/>,
            <Tab heading="Wt" key={1}/>,
            <Tab heading="Śr" key={2}/>,
            <Tab heading="Czw" key={3}/>,
            <Tab heading="Pt" key={4}/>,
        ];
    } else {
        return [
            <Tab heading="Pt" key={4}/>,
            <Tab heading="So" key={5}/>,
            <Tab heading="Nd" key={6}/>,
        ];
    }
  }

  checkValidFilters() {
    if ((this.props.configuration.lecturerMode && !this.props.filters.lecturer)
        || (!this.props.configuration.lecturerMode && !this.props.filters.mode)
        || !this.ensureFilteredValuesExist(this.props.filters, this.props.timetable)) {

      this.props.setFiltersOK(false);
      
      console.log("Home Page: Wrong filters, redirecting to Settings...");
      this.props.navigation.navigate("Settings");

    } else {
      this.props.setFiltersOK(true);
      console.log("Home Page Loaded");
    }
  }

  ensureFilteredValuesExist(filters, timetable) {
    if (this.props.configuration.lecturerMode) {
      return timetable.events.some((event) => event.lecturers.some((lecturer) => lecturer === filters.lecturer));
    }
    const keys = Object.keys(filters).filter((value) => value!=="lecturer");

    return keys.every((key) => timetable.events.some((event) => event[key] === filters[key]
        || ((key === "group") && event.specialization === filters.group)
        || (!filters.group && this.props.configuration.allowQuickGroupChange)));
  }
}

const mapStateToProps = (state) => {
  return {
    timetable: state.timetable.data,
    filters: state.configuration.filters,
    configuration: state.configuration,
    filtersOK: state.filtersOK
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFiltersOK: (value) => dispatch(setFiltersOK(value))
  };
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  configuration: PropTypes.object,
  lecturerMode: PropTypes.bool,
  quickGroupChangeAllowed: PropTypes.bool,
  setFiltersOK: PropTypes.func,
  timetable: PropTypes.object,
  filters: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
