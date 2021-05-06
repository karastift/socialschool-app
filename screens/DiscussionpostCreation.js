import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from '../config.json';

const host = configData.serverData.serverUrl;
const validateTokenUrl = configData.serverData.validateTokenUrl;

function DiscussionpostCreation ({ navigation, route }) {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('public');
    const [school, setSchool] = useState('');
    const [isPublic, setPublic] = useState(true);
    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const getStoredData = async () => {
        console.log('called');
        try {
            const tmpToken = await AsyncStorage.getItem('@token')
            const tmpGuestToken = await AsyncStorage.getItem('@guestToken')
            if (tmpToken != null) {
                setToken(JSON.parse(tmpToken));
                console.log('set token: '+token);
            }
            else if (tmpGuestToken !== null) {
                setToken(JSON.parse(tmpGuestToken));
                console.log('set guest token: '+token);
            }
            const tmpLoggedIn = await AsyncStorage.getItem('@loggedIn')
            if (tmpLoggedIn !== null) {
                setLoggedIn(JSON.parse(tmpLoggedIn));
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    const storeToken = async (key, value) => {
        console.log('storing...' + value);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        }
        catch (e) {
            console.error(e);
        }
    };

    async function getUserData() {
        try {
            let response = await fetch(`${host}${validateTokenUrl}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                            'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            });
            let responseJson = await response.json();

            await storeToken('@id', responseJson.data.id);
            await storeToken('@username', responseJson.data.username);
            await storeToken('@school', responseJson.data.school);
            setSchool(responseJson.data.school);
            return Promise.resolve();
        }

        catch (e) {
            console.error(e);
            return Promise.reject();
        }
    }

    const toggleStatus = () => {
        
        if (status == 'public') {
            setStatus(school);
            setPublic(false);
        }
        else {
            setStatus('public');
            setPublic(true);
        }
    };

    useEffect(()=>{ getStoredData() }, [route.params]);
    useEffect(()=>{ getUserData(); }, [token]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputView}>
                    <View style={styles.fieldWrapper}>
                        <TextInput
                            multiline
                            placeholder="title" 
                            placeholderTextColor="#fff"
                            onChangeText={text => setTitle(text)}
                            textAlign={'center'}
                            spellCheck={true}
                            returnKeyType="done"
                            style={styles.field}
                        />
                    </View>
                    <View style={styles.fieldWrapper}>
                        <TextInput
                            multiline
                            placeholder="body" 
                            placeholderTextColor="#fff"
                            onChangeText={text => setBody(text)}
                            textAlign={'center'}
                            spellCheck={true}
                            returnKeyType="done"
                            style={styles.field}
                        />
                    </View>
                    <Switch
                        trackColor={{ false: "rgb(40, 40, 40)", true: "red" }}
                        thumbColor={"rgb(40, 40, 40)"}
                        ios_backgroundColor="rgb(60, 60, 60)"
                        onValueChange={toggleStatus}
                        value={isPublic}
                    />
                    <Text style={styles.switchLabel}>{status}</Text>

                    <TouchableOpacity style={{padding: 25}} onPress={()=>{login();}}>
                        <Text style={styles.submit}>post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

};

export default DiscussionpostCreation;

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
        color: 'white'
    },
    headerText: {
        color: 'red',
        fontSize: 30,
        marginLeft: 20
        
    },
    loginButton: {
        marginVertical: 20,
        width: 50,
        alignItems:'center',
        justifyContent:'center',
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
    inputView: {
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fieldWrapper: {
        width: '70%',
        marginVertical: 15,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    field: {
        textAlign: 'center',
        color: 'white',
        paddingVertical: 10,
    },
    submit: {
        color: 'red',
        marginTop: 20
    },
    switchLabel: {
        marginTop: 10,
        color: 'white',
    },
});