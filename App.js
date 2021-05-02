import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import configData from "./config.json";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Welcome from './screens/Welcome';
import Discussionpost from './screens/Discussionpost';
import Login from './screens/Login';
import Register from './screens/Register';
import Error from './screens/Error';

// use header from navigation stack as header

const RootStack = createStackNavigator();

const App = () => {
    useEffect(()=>{ console.log('-'.repeat(30)); }, []);

    const [gotToken, setGotToken] = useState(false);
    const [error, setError] = useState('');

    const host = configData.serverData.serverUrl;
    const loginUrl = configData.serverData.loginUrl;

    const storeToken = async (key, value) => {
        console.log('storing...' + value);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        }
        catch (e) {
            console.error(e);
        }
    }
    /*
    const isPrevToken = async () => {
        console.log('called');
        try {
            const tmpToken = await AsyncStorage.getItem('@token')
            if (tmpToken.length > 10) {
                console.log('already got a token: '+tmpToken);
                return true;
            }
            return false;
        }
        catch (e) {
            console.error(e);
        }
    }*/

    async function loginAsGuest() {
        try {
            let response = await fetch(`${host}${loginUrl}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                            'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    guest: true
                })
            });
            let responseJson = await response.json();

            storeToken('@token', responseJson.token);
            storeToken('@guestToken', responseJson.token);

            return Promise.resolve();   
        }
        catch (e) {
            console.error(e);
            return Promise.reject();
        }
    }

    if (!gotToken) {
        return (
            <AppLoading 
                startAsync={loginAsGuest}
                onFinish={()=>setGotToken(true)}
                onError={()=>{setError('Error: Server')}}
            />
        );
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator>
            {error.length != 0 ? (
                <RootStack.Screen name="Error" options={{}}>
                {(props) => (
                    <Error {...props} error={error}/>
                )}
            </RootStack.Screen>
            ) : (
                <>
                <RootStack.Screen name="Welcome" options={{
                    headerTitleStyle: {color: 'red', fontWeight: '700'},
                    headerTransparent: true,
                    headerBackTitleStyle: {color: 'white'},
                    title: 'Discuss My School'
                }}>
                    {(props) => (
                        <Welcome {...props}/>
                    )}
                </RootStack.Screen>
                <RootStack.Screen name= "Discussionpost" options={{
                    headerTitleStyle: {color: 'red', fontWeight: '700'},
                    headerBackTitleStyle: {color: 'white'},
                    headerTransparent: true,
                }}>
                    {(props) => (
                            <Discussionpost {...props}/>
                        )}
                </RootStack.Screen>
                <RootStack.Screen name="Login" options={{
                    headerTitleStyle: {color: 'red', fontWeight: '700'},
                    headerBackTitleStyle: {color: 'white'},
                    headerTransparent: true,
                }}>
                    {(props) => (
                        <Login {...props}/>
                    )}
                </RootStack.Screen>
                <RootStack.Screen name="Register" options={{
                    headerTitleStyle: {color: 'red', fontWeight: '700'},
                    headerBackTitleStyle: {color: 'white'},
                    headerTransparent: true,
                }}>
                    {(props) => (
                        <Register {...props}/>
                    )}
                </RootStack.Screen>
            </>
        )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
    
}
export default App;