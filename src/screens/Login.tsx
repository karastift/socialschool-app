import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import schoolData from '../schools.json'
import { useMutation } from 'urql';
import styles from "../styles/LoginStyles";

import LOGIN_MUTATION from "../graphql/mutations/LoginMutation";

const Login = ({ navigation }) => {

    const [, login] = useMutation(LOGIN_MUTATION);

    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');
    const [showValue, setShowValue] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const schools = schoolData.schools;
    useEffect(() => {
        if (school.length != 0) {
            for (let i = 0; i < schools.length; i++) {
                if (schools[i].toLowerCase().includes(school.toLowerCase())) {
                    setShowValue(schools[i]);
                }
            }
        }
    }, [school]);

    const submit = () => {
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
            const variables = {
                usernameOrEmail: username,
                password: password,
                school: school
            };
            login(variables).then(result => {
                if (typeof result.error !== 'undefined') {
                    setError(result.error.message);
                }
                else {
                    navigation.navigate('Welcome', { refresh: null });
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <Text style={styles.error}>{error}</Text>
                <View style={styles.fieldWrapper}>
                    <TextInput  
                        placeholder="username or email" 
                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                        onChangeText={text => setUsername(text)}
                        textAlign={'center'}
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        returnKeyType="done"
                        style={styles.field}
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <TextInput  
                        placeholder="password" 
                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        textAlign={'center'}
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        returnKeyType="done"
                        style={styles.field}
                    />
                </View>
                <View style={styles.fieldWrapper}>
                    <Text style={styles.shower} onPress={() => {
                        setSchool(showValue);
                    }}>{showValue}</Text>
                    <TextInput  
                        placeholder="school"
                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                        value={school}
                        onChangeText={text => setSchool(text)}
                        textAlign={'center'}
                        returnKeyType="done"
                        style={styles.field}
                    />
                </View>
                <TouchableOpacity style={{padding: 25}} onPress={()=>{
                    submit();
                }}>
                    <Text style={styles.submit}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5}} onPress={()=>{navigation.navigate('Register');}}>
                    <Text style={styles.submit}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;