import React, { useEffect, useState } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { client } from './utils/createClient';
import { RootStackParamList } from './types/RootStackParamList';
import { Provider } from 'urql';

import { useMe } from './graphql/queries/useMe';
import { FeedStack } from './stacks/FeedStack/FeedStack';
import { AccountStack } from './stacks/AccountStack/AccountStack';
import { UserStack } from './stacks/UserStack/UserStack';
import { GradePageStack } from './stacks/GradePageStack/GradePageStack';
import { Auth } from './contexts/Auth';

// const Tab = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>()

// bundesländer sortieren
// bilder für noten

// if not logged in, you wont get in the app
/*
          Social School

           posttitle
    asdasdkfhdsjkhgjksdhfhsd
    djahdjkashjdkhasjdhahdjkha
   
            posttitle
    asdasdkfhdsjkhgjksdhfhsd
    djahdjkashjdkhasjdhahdjkha

            posttitle
    asdasdkfhdsjkhgjksdhfhsd
    djahdjkashjdkhasjdhahdjkha


<usericon> <feedicon> <gradesicon>    (accountstack)
  user        feed        grades
______________________________________
on userstack:
  -> show profile screen
    (instagram like)
    -> edit profile button (navigates to edit)
    -> logout button
  -> edit profile screen
  -> tab bar at bottom
on feedstack:
  -> feedscreen
    -> create button
    -> show posts
  -> poststack
    -> postscreen with comments
      -> edit button if owner of post
    -> edit post screen
  -> tab bar at bottom
on gradestack:
  -> grade summary screen
  -> grades of subject summary screen
  -> one grade screen
on accountstack:
  -> loginstack
    -> enter username
    -> enter password
    -> enter school
  -> registerstack
    -> enter username
    -> enter password
    -> confirm password
    -> enter school
*/

const Content = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [{data, fetching, error}, queryMe] = useMe();

  useEffect(() => {
    if (data?.me !== null && typeof data?.me !== 'undefined') {
      setAuthenticated(true);
    };
  }, [fetching]);

  return (
    <Auth.Provider value={{ setAuthenticated }}>
    <NavigationContainer>
      <Tab.Navigator>
          { authenticated
          ? (
            <>
              <Tab.Screen name="Feed" component={FeedStack}/>
              <Tab.Screen name="Grade" component={GradePageStack}/>
              <Tab.Screen name="User" component={UserStack}/>
            </>
            )
          : (
            <>
              <Tab.Screen name="Account" options={{ tabBarVisible: false }}>
                { props => <AccountStack {...props} queryMe={queryMe}/>}
              </Tab.Screen>
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