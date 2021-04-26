import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './screens/Welcome';
import Discussionpost from './screens/Discussionpost';

const RootStack = createStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="Welcome" component={Welcome} options={{
                    headerShown: false
                }}/>
                <RootStack.Screen name= "Discussionpost" component={Discussionpost} options={{
                    headerShown: false
                }}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
 
export default App;