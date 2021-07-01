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
        color: 'white'
    },
    headerText: {
        color: 'red',
        fontSize: 30,
        marginLeft: 20
        
    },
    headerBackground: {
        width: windowWidth,        
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    chartWrapper: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginTop: 100,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'center',
    },
    errorMsg: {
        color: 'white',
        textAlign: 'center',
        marginTop: 300,
    },
});

export default styles;