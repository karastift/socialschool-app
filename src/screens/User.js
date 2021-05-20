import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import schoolData from '../schools.json'
import styles from "../styles/UserStyles";

const User = ({ navigation }) => {

    const [loggedIn, setLoggedin] = useState(false);
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState('');

    return (
        <View style={styles.container}>
            { loggedIn && !error ? 
            (
                <View>
                    <Text style={{color: 'white'}}>user page</Text>
                    <Text style={{color: 'white'}}>grades: {JSON.stringify(grades)}</Text>
                </View>
            ) : 
            (
                <View>
                    <Text style={{color: 'white'}}>{!error ? 'Log in to see your profile.' : error}</Text>
                </View>
            )
            }
        </View>
    );
};

export default User;