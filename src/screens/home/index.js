import React, { Component } from "react";
import { Content, Tab, Container, Button, Body, Header, Icon, Title, Right, Left, Text, Tabs, ScrollableTab, Spinner, Toast, View } from "native-base";
import { AppState, Dimensions } from "react-native";

import TimetableServices from "../../timetable/TimetableServices";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFiltersOK, setDay, timetableLoadSuccess } from "../../actions";

import EventBlock from "./EventBlock";
import BreakBlock from "./BreakBlock";

const { width, height } = Dimensions.get("screen");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      refreshing: false
    };
    this._tabs = null;
  }
 
  componentWillMount() {
    console.log("Checking filters...");
    this.checkValidFilters();
    console.log("TEST 1 : FAILED ....");
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    console.log("TEST 2 :  ...");
    setTimeout(() => { this.setOldDay() }, 0);
    console.log("TEST 2 :  FAILED ...");
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
    console.log("Spinner");
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
          <Right>
            <Button
              disabled={ this.state.refreshing }
              transparent
              onPress={async() => {
                Toast.show({
                  text: "Odświeżanie",
                  duration: 3000
                }); 
                await this.refresh();
              }}
            >
              <Icon name="md-refresh" />
            </Button>
          </Right>
        </Header>

        { this.state.refreshing || !this.props.filtersOK ?
          <Spinner color="red" size={60} style={{alignItems: "center", alignSelf: "center", paddingVertical: height*0.4, paddingHorizontal: width*0.4}}/>
          :
          
          <Tabs 
            renderTabBar={() => <ScrollableTab />} 
            style={{backgroundColor: '#3f51b5'}} 
            prerenderingSiblingsNumber={1} 
            ref={(ref) => { this._tabs = ref; }} 
            onChangeTab={({ i }) => this.props.setDay((this.props.filters.mode === "Stacjonarne" ? i+1 : i+5).toString())}
          >
            {this.renderDayTabs(this.props.filters, this.props.configuration.lecturerMode)}
          </Tabs>
          
        }

      </Container>
    );
  }

  async refresh() {
    this.setState({refreshing: true});

    const isNetwork = await TimetableServices.isNetworkAvailable();
    
    if (isNetwork) {
      const update = await TimetableServices.IsNewTimetable(this.props.timetable.date);
      
      if (update) {
        Toast.show({
          text: "Pobieram nowy plan",
          duration: 3000
        }); 
        try {
          const timetable = await this.getTimetableWithRetries(3);
          await TimetableServices.WriteTimetableFile(timetable);
          this.props.timetableLoadSuccess(timetable);
        } catch (er) {
          Toast.show({
            text: "Błąd pobierania",
            duration: 3000
          }); 
        }
      } else {
        Toast.show({
          text: "Plan aktualny",
          duration: 3000
        }); 
      }

    } else {
      Toast.show({
        text: "Brak Internetu",
        duration: 3000
      }); 
    }

    this.setState({refreshing: false});
    setTimeout(() => { this.setOldDay() }, 0)
  }

  async getTimetableWithRetries(retriesCount) {
    let error;
    let timetable;
    for (let i = 0; i < retriesCount; i++) {
      try {
        console.log("trying to get the timetable...");
        timetable = await TimetableServices.fetchTimetable();
        if (timetable) {
          return timetable;
        }
      } catch (e) {
        error = e;
        timetable = null;
      }
    }
    throw error;
  }

  setOldDay() {
    if (this._tabs !== null && this.props.filtersOK && !this.state.refreshing) {
      this._tabs.goToPage(parseInt(this.props.selectedDay-(this.props.filters.mode === "Stacjonarne" || this.props.configuration.lecturerMode ? 1 : 5),10));
    }
    console.log("tabs: " + this._tabs !== null);
    console.log("filters: " + this.props.filtersOK);
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
    
    var dayFrom = 0;
    var dayTo = 0;
    if (isLecturerMode) {
      dayFrom = 0; dayTo = 7;
    } else if (filter.mode === "Stacjonarne") {
      dayFrom = 0; dayTo = 5;
    } else {
      dayFrom = 4; dayTo = 7;
    }
    
    for(var i = dayFrom; i < dayTo; i++) {
      var blocks = this.renderEventBlocks(this.props.timetable , this.props.filters, i+1, this.props.filters.group, this.props.configuration.lecturerMode);
      const style = {
        textAlign: "center",
        color: "rgb(125,125,125)",
        fontSize: 12,
      };
    
      result.push(
        <Tab heading={dayNames[i]} key={i} style={{backgroundColor: "rgb(220,220,220)"}}>
          <Content>
            {blocks.length === 0 ? <Text style={style}>Brak zajęć</Text> : blocks}
          </Content>
        </Tab>
      );
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
    
        const mergedProps = tmp.endTime.toString() + tmp.startTime.toString() + tmp.name.toLowerCase() + tmp.room + tmp.type + tmp.lecturers[0];
        const groupOfProps = tmp.specialization || tmp.group;
    
        tab.push((tmp.specialization || tmp.group).toString());
    
        for (let i = index + 1; i < result.length; i++) {
          const tmp2 = result[i];
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

}


const mapStateToProps = (state) => {
  return {
    timetable: state.timetable.data,
    filters: state.configuration.filters,
    configuration: state.configuration,
    filtersOK: state.filtersOK,
    selectedDay: state.selectedDay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFiltersOK: (value) => dispatch(setFiltersOK(value)),
    setDay: (value) => dispatch(setDay(value)),
    timetableLoadSuccess: (value) => dispatch(timetableLoadSuccess(value))
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
  setDay: PropTypes.func,
  timetable: PropTypes.object,
  filters: PropTypes.object,
  selectedDay: PropTypes.string,
  filtersOK: PropTypes.bool,
  timetableLoadSuccess: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
