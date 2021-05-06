import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from '../config.json';
import schoolData from '../schools.json'

const host = configData.serverData.serverUrl;
const getGradesUrl = configData.serverData.getGradesUrl;

const User = ({ navigation }) => {

    const [loggedIn, setLoggedin] = useState(false);
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        async function getToken() {
            const token = JSON.parse(await AsyncStorage.getItem('@token'));
            const tmpLoggedIn = await AsyncStorage.getItem('@loggedIn');
            const id = await AsyncStorage.getItem('@id');
            const school = await AsyncStorage.getItem('@school');
            const username = await AsyncStorage.getItem('@username');
            
            if (JSON.parse(tmpLoggedIn)) {
                console.log(id + school + username);
                try {
                    const response = await fetch(
                        `${host}${getGradesUrl}?token=${token}&userId=${1}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                                    'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    if (data.error != 'Posts were accessed.') {
                        setError(data.error);
                    }
                    setGrades(data.postData);
                }
                catch (error) {
                    console.error(error);
                }                

                setLoggedin(true);
            }
        }
        getToken();
    }, []);

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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        flex: 1,
        backgroundColor: 'rgb(26, 26, 26)',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight,
        color: 'white'
    },
    headerText: {
        color: 'red',
        fontSize: 30,
        marginLeft: 20
        
    },
    headerBackground: {
        width: windowWidth,        
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap'
    },
});