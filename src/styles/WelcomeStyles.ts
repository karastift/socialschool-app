import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        flex: 1,
        backgroundColor: 'rgb(26, 26, 26)',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight,
        color: 'white'
    },
    userButton: {
        position: 'absolute',
        width: 60,
        height: 50,
        top: 5,
        left: 5
    },
    loginButton: {
        position: 'absolute',
        width: 60,
        height: 50,
        top: 5,
        right: 40,
    },
    createButton: {
        width: 200,
        marginTop: 50,
        marginLeft: 70,
        height: 30,
    },
    loginText: {
        color: 'grey',
        fontWeight: 'bold',
        zIndex: 3
    },
    headerBackground: {
        width: windowWidth,        
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        flexWrap:'wrap',
        height: 10,
        zIndex: 2
    },
    scrollView: {
        zIndex: 1,
        marginTop: 20,
    },
    discussionpostWrapper: {
        marginBottom: 10,
    },
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        borderRadius: 24,
        alignItems: 'center',
        width: windowWidth-30,
        maxHeight: 700,
        overflow: 'hidden',
        paddingHorizontal: 6
        
    },
    discussionpostInfo: {
        color: 'grey',
        textAlign: 'left',
        fontWeight: '300',
        marginTop: 10
    },
    discussionpostInfo2: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    discussionpostTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },
    discussionpostBody: {
        color: 'white',
        textAlign: 'center'
    },
    loading: {
        marginTop: '60%',
        width: windowWidth-30,
        
    },
});

export default styles;