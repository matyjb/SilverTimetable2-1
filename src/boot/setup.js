import React, { Component } from "react";
import { StyleProvider } from "native-base";
import { AppState } from "react-native";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import Expo from "expo";
// import globalProps from "../globalProps";
import TimetableServices from "../timetable/TimetableServices";

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async Initialize() {
    await this.getFonts();

    AppState.addEventListener("change", state =>
      console.log("AppState changed to", state)
    );

    const isNetwork = TimetableServices.isNetworkAvailable();
    const timetable = await TimetableServices.ReadTimetableFile();

    if (isNetwork) {
      console.log("Jest internet");
      const update = await TimetableServices.IsNewTimetable(timetable.date);

      if (!timetable || update) {
        console.log("Pobieram nowy plan...");
        const fetchTimetable = await TimetableServices.fetchTimetable();
        try {
          console.log("Zapisuję nowy plan...");
          await TimetableServices.WriteTimetableFile(fetchTimetable);
        } catch (er) {
          console.log("Błąd przy zapisywaniu planu z Internetu", er);
        }
      } else {
        console.log("Aktualny plan jest w pamięci.");
      }

    } else {
      console.log("Nie ma połączenia z Internetem.");
      if (!timetable) {
        console.log("Nie ma planu w pamięci.");
      } else {
        console.log("Plan znajduje się w pamięci.")
      }
    }

  }

  async componentWillMount() {
    
    console.log("---------------");
    await this.Initialize();
    console.log("---------------");
    
    this.setState({ loading: false });
    console.log("IsAppReady: " + !this.state.loading);

    // globalProps.objs.isLoaded = !this.state.loading;
    // globalProps.objs.isError = this.state.loading;
  }

  async getFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
  }

  

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <App />
      </StyleProvider>
    );
  }
}
