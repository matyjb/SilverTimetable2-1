const React = require("react-native");
const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
  },
  pin: {
    resizeMode: 'contain',
    width: deviceWidth*0.18,
    height: deviceHeight*0.1
  },

};