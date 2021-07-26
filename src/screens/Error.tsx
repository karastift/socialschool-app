import React from 'react';
import { View, Text } from 'react-native';
import styles from "../styles/ErrorStyles";
import { ErrorProps } from '../types/screenProps/ErrorScreenTypes';


const Error = ({ navigation, route }: ErrorProps) => {
  return (
    <View style={styles.container}>
        <Text style={styles.message}>The application crashed due to a critical error.{"\n"} 
                                    You could try to reload it. If the application still crashes after reloading several times, please contact me by email:
                                    <Text style={styles.email}>{"\n"}___{"\n"}{"\n"}kiansinan@gmail.com{"\n"}___</Text>
        </Text>
        <Text style={styles.message}> </Text>
        <Text style={styles.error}>{route.params.error}</Text>
        <Text style={styles.message}> </Text>
        <Text style={styles.message}>I apologize for the inconvenience, but the application is still in production.</Text>
    </View>
  );
};

export default Error;