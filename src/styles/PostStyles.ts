import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        backgroundColor: 'rgb(26, 26, 26)',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
        color: 'white',
    },
    discussionpostWrapper: {
        marginBottom: 10,
        marginTop: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        alignItems: 'center',
        width: windowWidth-30,
        borderRadius: 24,
        textAlign: 'center',
        paddingRight: 6,
        paddingLeft: 6
    },
    discussionpostTitle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    discussionpostBody: {
        color: 'white',
        textAlign: 'center',
        paddingBottom: 10
    },
    commentWrapper: {
        marginTop: 15,
    },
    comment: {
        color: 'white',
        backgroundColor: 'rgb(35, 35, 35)',
        width: windowWidth-40,
        borderRadius: 24,
        paddingRight: 6,
        paddingLeft: 6
        
    },
    commentInfo: {
        color: '#bdbdbd',
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 15
    },
    commentBody: {
        color: '#a3a3a3',
        textAlign: 'center',
        paddingBottom: 10
    },
    loading: {
        marginTop: '60%',
        width: windowWidth-30,
    },
    postInfo: {
        color: 'grey',
        textAlign: 'left',
        fontWeight: '300',
        marginTop: 10
    },
    postInfo2: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    commentsArea: {
      marginLeft: 'auto',
      marginRight: 'auto',
    }, 
});

export default styles;