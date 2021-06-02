import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { UserPageButtonProps } from '../types/objectProps/UserPageButtonProps';



const UserPageButton = (props: UserPageButtonProps) => {

    const username = props.username;

    return (
        <TouchableOpacity style={[props.style, styles.userButton]} onPress={props.onPress}>
            <Text style={styles.loginText}>{username.substring(0, 20)}</Text>
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
        zIndex: 3,
        textAlign: 'center',
    },
});