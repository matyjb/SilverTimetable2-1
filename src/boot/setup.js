import React, { Component } from "react";
import { AppState } from "react-native";
import App from "../App";
import Expo from "expo";
import TimetableServices from "../timetable/TimetableServices";
// import FileManager from "../timetable/FileManager";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loadTimetableRequest,
  loadTimetableFailure,
  loadTimetableSuccess,
  loadConfiguration,
  setDay
} from "../actions";
// import globalProps from "../globalProps";

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async Initialize() {
    AppState.addEventListener("change", state =>
      console.log("AppState changed to", state)
    );
   
    this.props.timetableLoadRequest();
    console.log("Initialize");

    await this.getFonts();

    let configurationData = await TimetableServices.ReadConfigurationFile();
    const timetableData = await TimetableServices.ReadTimetableFile();

    if (!configurationData) {
      console.log("nie ma pliku konfiguracyjnego, tworzę domyslny");
      configurationData = { ...this.props.configuration };
      await TimetableServices.WriteConfigurationFile(configurationData);

    } else {
      console.log("jest konfiguracja w pamięci");
      this.props.loadConfiguration(configurationData);
    }

    this.props.setDay(null);

    const isNetwork = await TimetableServices.isNetworkAvailable();
    
    if (isNetwork) {
      console.log("Jest internet");

      const update = !timetableData ? false : await TimetableServices.IsNewTimetable(timetableData.date);

      if (!timetableData || update) {
        console.log("Pobieram nowy plan...");
        try {
          const timetable = await this.getTimetableWithRetries(5);
          console.log("Zapisuję nowy plan...");
          await TimetableServices.WriteTimetableFile(timetable);

          this.props.timetableLoadSuccess(timetable);

        } catch (er) {
          console.log("Błąd pobierania...", er);
          
          if (!timetableData) {
            this.props.timetableLoadFailure();
            return;

          } else {
            this.props.timetableLoadSuccess(timetableData);
          }
        }
      } else {
        console.log("Aktualny plan jest w pamięci.");
        this.props.timetableLoadSuccess(timetableData);
      }

    } else {
      console.log("Nie ma połączenia z Internetem.");
      if (!timetableData) {
        console.log("Nie ma planu w pamięci.");
        this.props.timetableLoadFailure();
        return;

      } else {
        console.log("Plan znajduje się w pamięci.");
        this.props.timetableLoadSuccess(timetableData);
      }
    }
  }

  async componentWillMount() {
    // await FileManager.deleteFile(globalProps.objs.configFileName);
    // await FileManager.deleteFile(globalProps.objs.timetableFileName);
    console.log("---------------");
    await this.Initialize();
    console.log("---------------");
    
    this.setState({ loading: false });
    console.log("IsAppReady: " + !this.state.loading);
  }

  render() {
    if (!this.props.timetableConfig.isLoaded && !this.props.timetableConfig.isError) {
      return <Expo.AppLoading />;
      
    } /* else if (this.props.timetableConfig.isError) {
      return (<ErrorPage onTimetableRefresh={() => this.refresh(false)} />);
  }*/ else {
      return (
        <App />
      );
    }
  }

  async getFonts() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
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
}

const mapStateToProps = (state) => {
  return {
    timetableConfig: state.timetable,
    timetableData: state.timetable.data,
    timetableFilters: state.configuration.filters,
    configuration: state.configuration
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    timetableLoadRequest: () => dispatch(loadTimetableRequest()),
    timetableLoadSuccess: (timetable) => dispatch(loadTimetableSuccess(timetable)),
    timetableLoadFailure: () => dispatch(loadTimetableFailure()),
    loadConfiguration: (config) => dispatch(loadConfiguration(config)),
    setDay: (value) => dispatch(setDay(value)),
  };
};

Setup.propTypes = {
  configuration: PropTypes.object,
  timetableConfig: PropTypes.object,
  timetableLoadFailure: PropTypes.func,
  timetableLoadSuccess: PropTypes.func,
  timetableLoadRequest: PropTypes.func,
  setDay: PropTypes.func,
  timetableFilters: PropTypes.object,
  loadConfiguration: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);