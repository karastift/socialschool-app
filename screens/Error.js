import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


const Error = ({ navigation, error }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.message}>The application crashed due to a critical error.{"\n"} 
                                    You could try to reload it. If the application still crashes after reloading several times, please contact me by email:
                                    <Text style={styles.email}>{"\n"}___{"\n"}{"\n"}kiansinan@gmail.com{"\n"}___</Text>
        </Text>
        <Text style={styles.message}> </Text>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.message}> </Text>
        <Text style={styles.message}>I apologize for the inconvenience, but the application is still in production.</Text>
    </View>
  );
};

export default Error;

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