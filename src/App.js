import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'urql';
import { client } from './utils/createClient';

import Welcome from "./screens/Welcome";
import SubjectBoard from "./screens/SubjectBoard";
import User from "./screens/User";
import Register from "./screens/Register";
import Login from "./screens/Login";
import GradepostCreation from "./screens/GradepostCreation";
import Error from "./screens/Error";
import DiscussionpostCreation from "./screens/DiscussionpostCreation";
import Discussionpost from "./screens/Discussionpost";
import Settings from "./screens/Settings";

const RootStack = createStackNavigator();

const App = () => {

    const [error, setError] = useState('');

    return (
        <Provider value={client}>
            <NavigationContainer>
                <RootStack.Navigator>
                {error.length != 0 ? (
                    <RootStack.Screen name="Error" component={Error} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerTransparent: true,
                        headerBackTitleStyle: {color: 'white'},
                        headerBackTitle: ""
                    }}/>
                ) : (
                    <>
                    <RootStack.Screen name="Welcome" component={Welcome} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerTransparent: true,
                        headerBackTitleStyle: {color: 'white'},
                        title: 'Social School'
                    }}/>
                    <RootStack.Screen name= "Discussionpost" component={Discussionpost} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        headerBackTitle: ""
                    }}/>
                    <RootStack.Screen name="Login" component={Login} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        headerBackTitle: ""
                    }}/>
                    <RootStack.Screen name="Register" component={Register} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                    }}/>
                    <RootStack.Screen name="DiscussionpostCreation" component={DiscussionpostCreation} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        title: 'new discussion',
                        headerBackTitle: "",
                    }}/>
                    <RootStack.Screen name="GradepostCreation" component={GradepostCreation} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        title: 'new grade',
                        headerBackTitle: "",
                    }}/>
                    <RootStack.Screen name="SubjectBoard" component={SubjectBoard} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        title: 'subject-board',
                        headerBackTitle: "",
                    }}/>
                    <RootStack.Screen name="User" component={User} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        title: 'user',
                        headerBackTitle: "",
                    }}/>
                    <RootStack.Screen name= "Settings" component={Settings} options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        headerBackTitle: ""
                    }}/>
                </>
            )}
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
    
}
export default App;