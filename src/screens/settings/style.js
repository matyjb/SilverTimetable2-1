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
    padding: 15
  },

  iconStyle: {
    fontSize: 24, 
    width: 24
  },

  listItemStyle: {
    borderColor: "transparent"
  },

  btnStyle: {
    marginTop: 20,
    alignSelf: "center"
  },

  pickerStyle: {
    alignSelf: "stretch",
    width: width*0.9,
    justifyContent: Platform.OS === "ios" ? "center" : "flex-start"

  },

  formStyle: {
    marginRight: 15,
  }
});

export default styles;
