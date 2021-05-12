import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const LogoutButton = (props) => {

    return (
        <TouchableOpacity style={[props.style, styles.loginButton]} onPress={props.onPress}>
            <Text style={styles.loginText}>logout</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    loginButton: {
        backgroundColor:'rgb(40, 40, 40)',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    loginText: {
        color: 'grey',
        fontWeight: 'bold',
        zIndex: 3
    },
});