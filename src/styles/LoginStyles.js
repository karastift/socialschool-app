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
        color: 'white'
    },
    headerText: {
        color: 'red',
        fontSize: 30,
        marginLeft: 20
        
    },
    loginButton: {
        marginVertical: 20,
        width: 50,
        alignItems:'center',
        justifyContent:'center',
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
        flexWrap:'wrap'
    },
    inputView: {
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fieldWrapper: {
        width: '70%',
        marginVertical: 15,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.8)',
    },
    field: {
        textAlign: 'center',
        color: 'white',
        paddingVertical: 10,
    },
    submit: {
        color: 'red',
        marginTop: 20
    },
    error: {
        color: 'lightblue',
        marginBottom: 20
    },
    shower: {
        color: "grey",
        textAlign: "center",
    },
});

export default styles;