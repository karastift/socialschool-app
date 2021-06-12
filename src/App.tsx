import React, { useState } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { client } from './utils/createClient';
import { RootStackParamList } from './types/RootStackParamList';
import { Provider } from 'urql';

import Welcome from "./screens/Welcome";
import SubjectBoard from "./screens/SubjectBoard";
import User from "./screens/User";
import Register from "./screens/Register";
import Login from "./screens/Login";
import GradepostCreation from "./screens/GradepostCreation";
// import Error from "./screens/Error";
import DiscussionpostCreation from "./screens/DiscussionpostCreation";
import Discussionpost from "./screens/Discussionpost";
import Settings from "./screens/Settings";
import { HeaderOptions } from './options/HeaderOptions';
import SubjectInfo from './screens/SubjectInfo';

const RootStack = createStackNavigator<RootStackParamList>();

// bundesländer sortieren
// bilder für noten

const App = () => {

    return (
      <Provider value={client}>
      <NavigationContainer>
        <RootStack.Navigator>
          
          <RootStack.Screen name="Welcome" component={Welcome} options={ { ...HeaderOptions, title: 'Social School' } }/>
          <RootStack.Screen name= "Discussionpost" component={Discussionpost} options={ { ...HeaderOptions, title: 'post' } }/>
          <RootStack.Screen name="Login" component={Login} options={ HeaderOptions }/>
          <RootStack.Screen name="Register" component={Register} options={ HeaderOptions }/>
          <RootStack.Screen name="DiscussionpostCreation" component={DiscussionpostCreation} options={ { ...HeaderOptions, title: 'new post' } }/>
          <RootStack.Screen name="GradepostCreation" component={GradepostCreation} options={ { ...HeaderOptions, title: 'new grade' } }/>
          <RootStack.Screen name="SubjectBoard" component={SubjectBoard} options={ { ...HeaderOptions, title: 'subject board' } }/>
          <RootStack.Screen name="SubjectInfo" component={SubjectInfo} options={ { ...HeaderOptions, title: 'subject' } }/>
          <RootStack.Screen name="User" component={User} options={ HeaderOptions }/>
          <RootStack.Screen name= "Settings" component={Settings} options={ HeaderOptions }/>
        
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
    );
    
}
export default registerRootComponent(App);