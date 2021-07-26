import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        flex: 1,
        backgroundColor: 'rgb(26, 26, 26)',
        color: 'white'
    },
    load: {
      marginTop: 200,
    },
    chartWrapper: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginTop: 100,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    chartContainer: {
      width: 350,
    },
    chart: {
      width: 340,
    },
});

export default styles;