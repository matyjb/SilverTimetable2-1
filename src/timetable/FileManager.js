import { Component } from "react";
// import { AsyncStorage } from "react-native";
import Expo from "expo";

class FileManager extends Component {

  static async readFile(filename) {
    const target = Expo.FileSystem.documentDirectory+filename;
    const getInfo = await Expo.FileSystem.getInfoAsync(target);
    if (getInfo.exists) {
      const fileEntry = await Expo.FileSystem.readAsStringAsync(target);
      const json = await JSON.parse(fileEntry);
      if (json) {
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
    } catch (er) {
      console.log("Error saving to " + target, er);
    }
  }
    
  static async deleteFile(filename) {
    const target = Expo.FileSystem.documentDirectory+filename;
    if (Expo.FileSystem.getInfoAsync(target).exists) {
      Expo.FileSystem.deleteAsync(target);
      console.log("Successfully deleted: " + filename);
      return;
    }
    console.log(filename + " could not be deleted or not exists.");
  }

}

export default FileManager;
