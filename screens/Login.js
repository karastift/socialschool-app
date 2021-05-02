import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from '../config.json';
import schoolData from '../schools.json'

const host = configData.serverData.serverUrl;
const loginUrl = configData.serverData.loginUrl;

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const storeToken = async (value) => {
        console.log('storing...' + value);
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@token', jsonValue)
        }
        catch (e) {
            console.error(e);
        }
    }

    const setLoggedIn = async () => {
        console.log('setting logged in...');
        try {
            const jsonValue = JSON.stringify(true)
            await AsyncStorage.setItem('@loggedIn', jsonValue)
        }
        catch (e) {
            console.error(e);
        }
    }

    async function login() {
        if (username.length == 0) {
            setError('Enter your username.');
        }
        else if (username.length < 4) {
            setError('Entered username is too short.');
        }
        else if (password.length == 0) {
            setError('Enter your password.');
        }
        else if (password.length < 4) {
            setError('Entered password is too short.');
        }
        else {
            try {
                let response = await fetch(`${host}${loginUrl}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                                'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        school: school,
                        password: password
                    })
                })
                .then(response => response.json())
                .then((data) => {
                    if (data.message == 'Successful login.') {

                        storeToken(data.token);
                        setLoggedIn();
                        navigation.navigate('Welcome', { justForRefresh: null })
                    }
                    else {
                        setError('Login failed.');
                    }
                })
                
                return Promise.resolve();   
            }
            catch (e) {
                console.error(e);
                return Promise.reject();
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBackground} >
                <Text style={styles.headerText}>Discuss My School</Text>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.error}>{error}</Text>
                <View style={styles.fieldWrapper}>
                    <TextInput  
                        placeholder="username" 
                        placeholderTextColor="#fff"
                        onChangeText={text => setUsername(text)}
                        textAlign={'center'}
                        spellCheck={false}
                        returnKeyType="done"
                        style={styles.field}
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <TextInput  
                        placeholder="password" 
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        textAlign={'center'}
                        spellCheck={false}
                        returnKeyType="done"
                        style={styles.field}
                    />
                </View>
                <Picker
                    style={{height: 170, width: '100%', color: 'white'}}
                    itemStyle={{color: 'black'}}
                    selectedValue={school}
                    onValueChange={(itemValue, itemIndex) =>
                        setSchool(itemValue)
                    }>
                    {schoolData.schools.sort().map((school2, index) => {
                        return (
                            <Picker.Item key={index} color="white" label={school2} value={school2}/>
                        );
                    })}
                </Picker>

                <TouchableOpacity style={{padding: 25}} onPress={()=>{login();}}>
                    <Text style={styles.submit}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5}} onPress={()=>{navigation.navigate('Register');}}>
                    <Text style={styles.submit}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5}} onPress={()=>{navigation.navigate('Welcome');}}>
                    <Text style={styles.submit}>back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

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
    error: {
        color: 'lightblue',
        marginBottom: 20
    }
});