import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: 'rgb(26, 26, 26)',
    width: windowWidth,
    height: windowHeight,
    color: 'white',
    alignContent: 'center',
  },
  buttonWrapper: {
    marginTop: 100,
  },
});

export default styles;