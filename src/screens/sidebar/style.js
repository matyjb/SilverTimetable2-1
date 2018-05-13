import {Platform, Dimensions, NativeModules, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const deviceType = NativeModules.PlatformConstants.interfaceIdiom;

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: deviceType==="pad"? 32 : 16,
    marginLeft: 16
  },
  footer: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: deviceType==="pad"? 24:12,
    color: "#808080",
    marginLeft: 12,
    marginBottom: 6
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  icon: {
    color: "#777", 
    fontSize: deviceType==="pad"? 36 : 26, 
    width: deviceType==="pad"? 36 : 26,
    marginRight: deviceType==="pad"? 25 : 5
  },
  row: {
    backgroundColor: Platform.OS === "ios" ? "#fafafa" : "#3f51b5", 
    height: Math.max(deviceHeight, deviceWidth) * 0.25
  },
  content: { 
    flex: 1, 
    backgroundColor: "#fff", 
    top: -1 
  },
  left: { 
    alignSelf: "flex-end", 
    marginLeft: 16, 
    marginBottom: 16 
  },
  sidebarTitleLecturer: {
    fontSize: deviceType==="pad"? 36:21, 
    textAlign: "left"
  },
  sidebarTitleField: {
    fontSize: deviceType==="pad"? 36: 21, 
    textAlign: "left"
  },
  sidebarTitleSemester: {
    fontSize: deviceType==="pad"? 24: 14, 
    textAlign: "left"
  }

});

export default styles;