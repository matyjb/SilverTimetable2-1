import { Component } from "react";
import { NetInfo } from "react-native";
import globalProps from "../globalProps";
import FileManager from "./FileManager";
import * as Moment from "moment";

class TimetableServices extends Component {

  /**
 * @returns {boolean} Boolean value whether network is available
 */
  static async isNetworkAvailable() {
    
    const netStat = await NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {
        // console.log('Internet is connected');
        return true;
      }
      return false;
    })

    return netStat;
  }
  
  /**
   * @param {string} date Date to compare
 * @returns {Promise<boolean>} Boolean promise whether new timetable is available
 */
  static async IsNewTimetable(date) {
    const newDate = await this.getNewDate();
    console.log(date);
    // const date = globalProps.objs.timetable.date;
    if (newDate && date) {
      console.log(newDate === date ? "Nie ma nowej wersji planu." : "Jest nowa wersja planu.");
      return !(newDate === date); // Jest nowa wersja planu
    }
    console.log("Could not check new timetable");
    return false;
  }

  /**
 * @returns {Promise<any>} JSON parsed date promise
 */
  static async getNewDate() {
    const url = "https://silvertimetable.azurewebsites.net/api/timetable/date";
    const response = await fetch(url);
    try {
      const json = await response.json();
      return json;

    } catch(e) {
      console.log("error parsing data. ", e);
    }
  }

  /**
 * @returns {Promise<any>} JSON parsed timetable promise
 */
  static async fetchTimetable() {
    const url = "https://silvertimetable.azurewebsites.net/api/timetable";
    const response = await fetch(url);
    try {
      const json = await response.json();
      const events = json.events.map((event) => {
        return {
          ...event,
          startTime: Moment.utc(event.startTime, "HH:mm"),
          endTime: Moment.utc(event.endTime, "HH:mm"),
        };
      });
      return { ...json, events };

    } catch(e) {
      console.log("error parsing data. ", e);
    }
  }

  /**
 * @returns {Promise<any>} Fetching TimetableFile from device storage
 */
  static async ReadTimetableFile() {
    const timetable = await FileManager.readFile(globalProps.objs.timetableFileName);
    const json = await JSON.parse(timetable);
    
    if (json) {
      const events = json.events.map((event) => {
        return {
          ...event,
          startTime: Moment.utc(event.startTime, "HH:mm"),
          endTime: Moment.utc(event.endTime, "HH:mm"),
        };
      });
      return { ...json, events };
    }
  }

  /**
 * @param {any} data timetable data to save
 */
  static async WriteTimetableFile(data) {
    const eventsWithSerializedDates = data.events.map((event) => {
      return {
        ...event,
        startTime: event.startTime.format("HH:mm"),
        endTime: event.endTime.format("HH:mm"),
      };
    });
    await FileManager.writeFile(globalProps.objs.timetableFileName, { ...data, events: eventsWithSerializedDates });
  }

}

export default TimetableServices;
