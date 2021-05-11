import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';



const UserPageButton = (props) => {

    const username = props.username;

    return (
        <TouchableOpacity style={[props.style, styles.userButton]} onPress={props.onPress}>
            <Text style={styles.loginText}>{username}</Text>
        </TouchableOpacity>
    );
};

export default UserPageButton;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    userButton: {
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