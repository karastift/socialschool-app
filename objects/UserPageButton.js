import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';



const UserPageButton = (props) => {

    return (
        <TouchableOpacity style={[props.style, styles.userButton]}>
            <Text style={styles.loginText}>user</Text>
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