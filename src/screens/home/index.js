import React, { Component } from "react";
import { Container, Content, Button, Body, Header, Icon, Title, Right, Left, Text } from "native-base";
import { AppState } from "react-native";
// import Timetable from "./../../timetable/Timetable";
import styles from "./styles";

class Home extends Component {
    constructor(props) {
        super(props);
        console.log("text");
        /*const onDeviceReady = () => {
            // TimetableServices.initialize().then(() => 
            this.Initialize();
        };
        document.addEventListener("deviceready", onDeviceReady, false);*/
        //const onDeviceReady = () => {this.fetchData()}
        //AppState.addEventListener("ready", onDeviceReady);
        this.state = {
            // selectedDay: this.currentDay(this.props.timetableFilters.mode),
            selectedDay: 1,
            selectedEvent: null,
            dataFetched: null,
            appState: AppState.currentState,
        };
        
    }
    /* TODO:
        redux

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
    componentWillMount() {
        this.fetchData();
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

    fetchData = async () => {
        const response = await fetch("https://silvertimetable.azurewebsites.net/api/timetable/date");
        // mockup
        // https://gist.githubusercontent.com/michaelspace/b998f5d5a29e0124bf9c5701a5a1c19e/raw/fb86b48e5ed154c4ce1d6458f9d1c29458e479ad/plan.json
        const json = await response.json();
        console.log("fetching data ...");
        this.setState({
            dataFetched: json
        })
    };
    
  render() {
    return (
      <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            // eslint-disable-next-line
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Plan zajęć WZIiM</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>MainPage</Text>
                    <Text>{this.state.dataFetched}</Text>
                    <Text>Current state: {this.state.appState}</Text>
                </Content>
            </Container>
    );
  }
}

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