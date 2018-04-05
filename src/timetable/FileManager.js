import { Component } from "react";
import { AsyncStorage } from "react-native";

class FileManager extends Component {

  static async readFile(filename) {
    const fileEntry = await AsyncStorage.getItem(filename);
    const json = await JSON.parse(fileEntry);
    if (json) {
      return json;
    }
  }

  static async writeFile(filename, dataObj) {
    try {
      AsyncStorage.setItem(filename, JSON.stringify(dataObj));
    } catch (er) {
      console.log("Error saving to " + filename, er);
    }
  }
    

}

export default FileManager;
