import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import configData from '../config.json';
import schoolData from '../schools.json'

const host = configData.serverData.serverUrl;
const registerUrl = configData.serverData.registerUrl;

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    async function register() {
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
        else if (confirmPassword != password) {
            setError('Your passwords do not match.');
        }
        else {
            try {
                let response = await fetch(`${host}${registerUrl}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                                'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        school: school,
                        password: password,
                        confirm_password: confirmPassword
                    })
                })
                .then(response => response.json())
                .then((data) => {
                    if (data.message == 'User was created.') {
                        console.log(data.message);
                        console.log(data);
                        navigation.navigate('Login');
                    }
                    else {
                        console.log(data.message);
                        console.log(data);
                        setError('Register process failed.');
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
            <View style={styles.headerground}>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.error}>{error}</Text>
                <View style={styles.fieldWrapper}>
                    <TextInput  
                        placeholder="username" 
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        textAlign={'center'}
                        spellCheck={false}
                        returnKeyType="done"
                        style={styles.field}
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <TextInput  
                        placeholder="confirm password" 
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        secureTextEntry={true}
                        onChangeText={text => setConfirmPassword(text)}
                        textAlign={'center'}
                        spellCheck={false}
                        returnKeyType="done"
                        style={styles.field}
                    />
                </View>
                <Picker
                    style={{height: 170, width: '100%', color: 'white'}}
                    itemStyle={{color: 'white'}}
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

                <TouchableOpacity style={{padding: 25}} onPress={()=>{register();}}>
                    <Text style={styles.submit}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5}} onPress={()=>{navigation.navigate('Login');}}>
                    <Text style={styles.submit}>Login</Text>
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
        borderBottomColor: 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 1,
    },
    field: {
        textAlign: 'center',
        color: 'white',
        paddingVertical: 10,
    },
    submit: {
        color: 'red',
        marginTop: 10
    },
    error: {
        color: 'lightblue',
        transform: [{translateY: 230}],
    }
});