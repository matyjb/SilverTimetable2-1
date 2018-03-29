import React, { Component } from "react";
import { Container, Content, Button, Body, Header, Icon, Title, Right, Left, Text } from "native-base";
import { AppState } from "react-native";
import globalProps from "../../globalProps";
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log("text");
    /* const onDeviceReady = () => {
            // TimetableServices.initialize().then(() => 
            this.Initialize();
        };
        document.addEventListener("deviceready", onDeviceReady, false);*/
    // const onDeviceReady = () => {this.fetchData()}
    // AppState.addEventListener("ready", onDeviceReady);
    this.state = {
      appState: AppState.currentState,
    };
        
  }
  /* TODO:
        Initialize:
        1 czy config w sesji (czyli isLoaded isError..)
           jesli tak to koniec
        2 czytaj plik konfiguracyjny
        3 sprawdz czy internet
           jesli jest to pobierz nowy jesli: nie ma w pliku konfiguracyjnym lub jest nowy

           jesli nie ma to wyswietl komunikat ze nie ma internetu
                jesli nie ma planu w pliku konfiguracyjnym wyswietl ErrorPage nie ma internetu i planu w pamieci

        4 Jesli nie bylo planu (pliku konfiguracyjnego) to stworz domyslny
            jesli byla to wyswietl ze jest konfig w pamieci
    */

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
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >
                  <Icon name="ios-menu" />
                </Button>
              </Left>
              <Body>
                <Title style={{ width: "100%" }}>Plan zajęć WZIiM</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <Text>MainPage</Text>
              <Text>Current state: {this.state.appState}</Text>
              <Text>{globalProps.timetable}</Text>
            </Content>
          </Container>
        );
      }
}

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