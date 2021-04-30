import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from '@react-native-community/async-storage';
import AppLoading from 'expo-app-loading';
import configData from "./config.json";

import Welcome from './screens/Welcome';
import Discussionpost from './screens/Discussionpost';
import Login from './screens/Login';
import Error from './screens/Error';

const RootStack = createStackNavigator();

const App = () => {

    const [token, setToken] = useState('noToken');
    const [gotToken, setGotToken] = useState(false);
    const [error, setError] = useState('');

    const host = configData.serverData.serverUrl;
    const loginUrl = configData.serverData.loginUrl;

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

            setToken(responseJson.token);
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
                <RootStack.Screen name="Error" options={{ headerShown: false }}>
                {(props) => (
                    <Error {...props} error={error}/>
                )}
            </RootStack.Screen>
            ) : (
                <>
                <RootStack.Screen name="Welcome" options={{ headerShown: false }}>
                    {(props) => (
                        <Welcome/>
                    )}
                </RootStack.Screen>
                <RootStack.Screen name= "Discussionpost" component={Discussionpost} options={{
                    headerShown: false
                }}/>
                <RootStack.Screen name="Login" options={{ headerShown: false }}>
                    {(props) => (
                        <Login/>
                    )}
                </RootStack.Screen>
            </>
        )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
    
}
export default App;