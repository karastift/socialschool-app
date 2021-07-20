import { Platform, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        flex: 1,
        alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
    },
    scrollView: {
        zIndex: 1,
        marginTop: Platform.OS === 'ios' ? 70 : 120,
    },
    discussionpostWrapper: {
        marginBottom: 10,
    },
    discussionpost: {
        // color: 'white',
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
    loadMore: {
        textAlign: 'center',
        color: 'red',
    },
});

export default styles;