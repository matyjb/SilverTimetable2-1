import { Component } from "react";
// import { AsyncStorage } from "react-native";
import Expo from "expo";

class FileManager extends Component {

  static async readFile(filename) {
    /* const fileEntry = await AsyncStorage.getItem(filename);
    const json = await JSON.parse(fileEntry);
    if (json) {
      return json;
    }*/
    const target = Expo.FileSystem.documentDirectory+filename;
    // console.log("TEST target: " + target);
    const getInfo = await Expo.FileSystem.getInfoAsync(target);
    // console.log("TEST getInfo: " + getInfo.exists);
    if (getInfo.exists) {
      const fileEntry = await Expo.FileSystem.readAsStringAsync(target);
      const json = await JSON.parse(fileEntry);
      if (json) {
        // console.log("TEST json-date: " + json.date);
        return json;
      } else {
        return false;
      }

    } else {
      return false;
    }
  }

  static async writeFile(filename, dataObj) {
    const target = Expo.FileSystem.documentDirectory+filename;
    try {
      Expo.FileSystem.writeAsStringAsync(target, JSON.stringify(dataObj));
    //  AsyncStorage.setItem(filename, JSON.stringify(dataObj));
    } catch (er) {
      // console.log("Error saving to " + filename, er);
      console.log("Error saving to " + target, er);
    }
  }
    

}

export default FileManager;
