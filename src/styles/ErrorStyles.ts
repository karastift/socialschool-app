import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        flex: 1,
        backgroundColor: 'rgb(26, 26, 26)',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
        color: 'white',
        justifyContent: 'center'
    },
    message: {
        color: 'white',
        textAlign: 'center'
    },
    error: {
        color: 'red',
        textAlign: 'center'
    },
    email: {
        color: 'gray'
    }
});

export default styles;