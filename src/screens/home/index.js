import React, { Component } from "react";
import { Container, Content, Button, Body, Header, Icon, Title, Right, Left, Text, Tabs, Tab, ScrollableTab } from "native-base";
import { AppState, Dimensions, View } from "react-native";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { setFiltersOK } from "../../actions";
import EventBlock from "./EventBlock";
import BreakBlock from "./BreakBlock";
import * as Moment from "moment";

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
        <Tabs renderTabBar={()=> <ScrollableTab />} style={{backgroundColor: '#3f51b5'}} prerenderingSiblingsNumber={1}>
          {this.renderDayTabs(this.props.filters, this.props.configuration.lecturerMode)}
        </Tabs>
      </Container>
    );
  }

  renderDayTabs(filter, isLecturerMode) {
    const dayNames = [
      "PN",
      "WT",
      "ŚR",
      "CZW",
      "PT",
      "SO",
      "NIE",
    ];
    var result = [];

    var dayFrom = 0, dayTo = 0;
    if(isLecturerMode){
      dayFrom = 0; dayTo = 7;
    }else if(filter.mode === "Stacjonarne"){
      dayFrom = 0; dayTo = 5;
    }else{
      dayFrom = 4; dayTo = 7;
    }
    for(var i = dayFrom; i < dayTo; i++){
      result.push(
        <Tab heading={dayNames[i]} key={i} style={{backgroundColor: "rgb(220,220,220)"}}>
          <Content>
            {this.renderEventBlocks(this.props.timetable,this.props.filters,i+1,this.props.filters.group,this.props.configuration.lecturerMode)}
          </Content>
        </Tab>
      )
    }
    return result;
  }

  renderEventBlocks(data, filters, dayOfWeek, group, lecturerMode) {
    
    const dayNames = {
        1: "PN",
        2: "WT",
        3: "ŚR",
        4: "CZW",
        5: "PT",
        6: "SO",
        7: "NIE",
    };
    const tablica = [];
    const result = lecturerMode
        ?
        data.events.filter((obj) => (obj.lecturers.some((lecturer) => lecturer === filters.lecturer)
            && obj.dayOfWeek === dayNames[dayOfWeek]))
        :
        data
            .events
            .filter((obj) => (obj.group.toString() === group || obj.specialization === group)
                && obj.dayOfWeek === dayNames[dayOfWeek]
                && obj.degree === filters.degree
                && obj.department === filters.department
                && obj.fieldOfStudy === filters.fieldOfStudy
                && obj.mode === filters.mode
                && obj.semester === filters.semester
                && obj.academicYear === filters.academicYear);

    result.sort((a, b) => a.startTime.isAfter(b.startTime) ? 1 : -1); // na wypadek gdyby dane nie były posortowane
    if (lecturerMode) {
        for (let index = 0; index < result.length; index++) {
            const tmp = result[index];

            const tab = [];

            // tslint:disable-next-line:max-line-length
            const mergedProps = tmp.endTime.toString() + tmp.startTime.toString() + tmp.name.toLowerCase() + tmp.room + tmp.type + tmp.lecturers[0];
            const groupOfProps = tmp.specialization || tmp.group;

            tab.push((tmp.specialization || tmp.group).toString());

            for (let i = index + 1; i < result.length; i++) {
                    const tmp2 = result[i];
                    // tslint:disable-next-line:max-line-length
                    const mergedPropss = tmp2.endTime.toString() + tmp2.startTime.toString() + tmp2.name.toLowerCase() + tmp2.room + tmp2.type + tmp2.lecturers[0];
                    const groupOfPropss = tmp2.specialization || tmp2.group;
                    if (mergedProps === mergedPropss && groupOfProps !== groupOfPropss) {
                        tab.push((tmp2.specialization || tmp2.group).toString());
                        result.splice(i, 1);
                        i = i - 1;
                    }
            }
            tab.sort();
            result[index].groups = tab;
            
        }
    }
    const elements = result.length
        ? [(<BreakBlock isStart startTime={result[0].startTime} key={0}/>)]
        : [];
    // var elements = [];

    result.forEach((event, index) => elements.push(
        <React.Fragment key={index + 1}>
            <EventBlock
                event={event}
                order={index + 1}
                lecturerMode={lecturerMode}
                />
            {index + 1 < result.length &&
              <BreakBlock duration={result[index + 1].startTime.diff(event.endTime, "minutes")} />
            }
        </React.Fragment>
    ));

    if (result.length) {
        elements.push(<BreakBlock isEnd key={result.length+1}/>);
    }
    return elements;
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
