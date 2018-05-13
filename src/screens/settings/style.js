import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: "center"
  },

  viewStyle: {
    width: 280, 
    alignItems: "center",
    alignSelf: "center"
  },
  
  imgStyle: {
    height: 155,
    width: 155
  },

  textStyle: {
    width: 280,
    textAlign: "center"
  },

  filterTextStyle: {
    fontSize: width*0.031,
    paddingTop: width*0.04,
  },

  quickGroupStyle: {
    fontSize: width*0.043,
  },

  labelTextStyle: {
    fontSize: width*0.037,
    padding: width*0.025,
  },

  iconStyle: {
    fontSize: width*0.067,
    width: width*0.067,
  },

  iconBottomStyle: {
    fontSize: width*0.067,
    width: width*0.067,
  },

  titleStyle: {
    paddingTop: width*0.04,
    paddingLeft: width*0.04,
    fontSize: width*0.037,
  },

  listItemStyle: {
    borderColor: "transparent"
  },

  btnStyle: {
    marginTop: width*0.055,
    alignSelf: "center"
  },

  pickerStyle: {
    alignSelf: "stretch",
    width: width*0.9,
    justifyContent: Platform.OS === "ios" ? "center" : "flex-start",
  },

  formStyle: {
    marginRight: width*0.04,
  },
});

export default styles;
