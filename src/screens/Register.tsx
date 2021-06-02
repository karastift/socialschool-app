import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import schoolData from '../schools.json'
import { useMutation } from 'urql';
import styles from "../styles/RegisterStyles";

import REGISTER_MUTATION from "../graphql/mutations/RegisterMutation";

const Register = ({ navigation }: any) => {

    const [registerResult, register] = useMutation(REGISTER_MUTATION);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [showValue, setShowValue] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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

    const submit = (name: string, mail: string, passedSchool: string,  pass: string, confPass: string) => {
        if (name.length == 0) {
            setError('Enter your username.');
        }
        else if (name.length < 4) {
            setError('Entered username is too short.');
        }
        else if (!mail.includes('@')) {
            setError('Invalid email.');
        }
        else if (pass.length == 0) {
            setError('Enter your password.');
        }
        else if (pass.length < 4) {
            setError('Entered password is too short.');
        }
        else if (confPass != pass) {
            setError('Your passwords do not match.');
        }
        else {
            const variables = { email: mail, username: name, school: passedSchool, password: pass };
            register({ options: variables }).then(result => {
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
                        placeholder="email" 
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        onChangeText={text => setEmail(text)}
                        textAlign={'center'}
                        spellCheck={false}
                        returnKeyType="done"
                        style={styles.field}
                        keyboardType="email-address"
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
                <TouchableOpacity style={{padding: 25}} onPress={()=>{
                    submit(
                        username,
                        email,
                        school,
                        password,
                        confirmPassword
                    );
                }}>
                    <Text style={styles.submit}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5}} onPress={()=>{navigation.navigate('Login');}}>
                    <Text style={styles.submit}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;