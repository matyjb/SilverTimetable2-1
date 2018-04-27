import React, { Component } from "react";
import { Container, Content, Button, Body, Header, Icon, Title, Right, Left, Text, Tabs, Tab, ScrollableTab } from "native-base";
import { AppState, Dimensions } from "react-native";
import PropTypes from 'prop-types';
import {checkFilter} from "../settings/checkFilter";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log("Home Page Loaded");
    this.state = {
      appState: AppState.currentState,
    };
    this.filter = {
      isLecturerMode: false, 
      lecturer: "Alinka", 
      academicYear: null, 
      department: null, 
      fieldOfStudy: null, 
      degree: null, 
      semester: null, 
      mode: "Stacjonarne", 
      group: null, 
    }
    // if(!checkFilter()){ //to be able to work on tabs
      if(false){
      console.log("zle filtry przechodzenie do settings");
      this.props.navigation.navigate("Settings");
    }
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
  
  render() {
    return (
      <Container>
        <Header iosBarStyle='light-content' backgroundColor='#3f51b5' androidStatusBarColor='#3f51b5' Left hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
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
          <Text>MainPage</Text>
          <Text>Current state: {this.state.appState}</Text>
        </Content>
      </Container>
    );
  }
}
// <Text>{globalProps.timetable}</Text>
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
/*
<Timetable
                            data={data}
                            filters={filters}
                            selectedDay={this.state.selectedDay}
                            selectedEvent={this.state.selectedEvent}
                            // bottomDrawerOpen={this.props.timetableConfig.bottomDrawerOpen}
                            // quickGroupChangeAllowed={this.props.configuration.allowQuickGroupChange}
                            // handleGroupChange={(group) => this.props.changeGroup(group)}
                            onDayChange={this.changeDay}
                            onEventBlockClick={(event) => this.handleEventBlockClick(event)}
                            // onBottomDrawerClose={this.props.closeBottomDrawer}
                            onTimetableRefresh={() => this.refresh(false)}
                            // lecturerMode={this.props.configuration.lecturerMode}
                        />
*/