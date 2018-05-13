import {Platform, Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

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
    fontSize: deviceWidth*0.043,
    marginLeft: deviceWidth*0.043,
  },
  footer: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: deviceWidth*0.031,
    color: "#808080",
    marginLeft: deviceWidth*0.031,
    marginBottom: deviceWidth*0.013,
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  icon: {
    color: "#777", 
    fontSize: deviceWidth*0.073,
    width: deviceWidth*0.073,
    marginRight: deviceWidth*0.013,
    marginLeft: deviceWidth*0.013,
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
    marginLeft: deviceWidth*0.043,
    marginBottom: deviceWidth*0.043,
  },
  sidebarTitleLecturer: {
    fontSize: deviceWidth*0.058,
    textAlign: "left"
  },
  sidebarTitleField: {
    fontSize: deviceWidth*0.058,
    textAlign: "left"
  },
  sidebarTitleSemester: {
    fontSize: deviceWidth*0.037,
    textAlign: "left"
  }

});

export default styles;