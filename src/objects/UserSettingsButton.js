import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

const UserPageSettingsButton = _ => {

    return (
        <TouchableOpacity style={styles.container}>
            <Icon name="setting" size={20} color="white"/>
        </TouchableOpacity>
    );

};

export default UserPageSettingsButton;

const styles = StyleSheet.create({
    container: {
        width: '95%',
        margin: 10,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderRadius: 20,
        alignItems: 'center',
    },
});