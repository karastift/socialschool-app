import React, { useEffect, useState } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarOptions, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { client } from './utils/createClient';
import { RootStackParamList } from './types/RootStackParamList';
import { Provider } from 'urql';
import Icon from 'react-native-vector-icons/Feather'

import { useMe } from './graphql/queries/useMe';
import { FeedStack } from './stacks/FeedStack/FeedStack';
import { AccountStack } from './stacks/AccountStack/AccountStack';
import { UserStack } from './stacks/UserStack/UserStack';
import { GradePageStack } from './stacks/GradePageStack/GradePageStack';
import { Auth } from './contexts/Auth';

const Tab = createBottomTabNavigator<RootStackParamList>();
const FeedTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => (
    <Icon name='message-circle' color={color} size={30}/>
  ),
  title: '',
};
const GradeTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => (
    <Icon name='pen-tool' color={color} size={26}/>
  ),
  title: '',
};
const UserTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => (
    <Icon name='user' color={color} size={30}/>
  ),
  title: '',
};

const TabBarOptions: BottomTabBarOptions = {
  activeTintColor: 'red',
  inactiveTintColor: 'white',
  style: {
    backgroundColor: 'rgb(26, 26, 26)',
  },
  allowFontScaling: true,
  iconStyle: {
    marginTop: 8,
    backgroundColor: 'rgb(26, 26, 26)'
  },
};

// bundesländer sortieren
// bilder für noten

const Content = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [{data, fetching, error}] = useMe();

  useEffect(() => {
    if (data?.me !== null && typeof data?.me !== 'undefined') {
      setAuthenticated(true);
    };
  }, [fetching]);

  return (
    <Auth.Provider value={{ setAuthenticated }}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={TabBarOptions}>
            { authenticated
            ? (
              <>
                <Tab.Screen name="Feed" component={FeedStack} options={FeedTabOptions}/>
                <Tab.Screen name="Grade" component={GradePageStack} options={GradeTabOptions}/>
                <Tab.Screen name="User" component={UserStack} options={UserTabOptions}/>
              </>
              )
            : (
              <>
                <Tab.Screen name="Account" component={AccountStack} options={{ tabBarVisible: false }}/>
              </>
              )
            }
        </Tab.Navigator>
      </NavigationContainer>
    </Auth.Provider>
  );
};

const App = () => {
  
  return (
    <Provider value={client}>
      <Content/>
    </Provider>
  );
};

export default registerRootComponent(App);