import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { client } from './utils/createClient';
import { Provider } from 'urql';

import { useMe } from './graphql/queries/useMe';
import { FeedStack } from './stacks/FeedStack/FeedStack';
import { AccountStack } from './stacks/AccountStack/AccountStack';
import { UserStack } from './stacks/UserStack/UserStack';
import { GradePageStack } from './stacks/GradePageStack/GradePageStack';
import { Auth } from './contexts/Auth';
import { FeedTabOptions } from './options/FeedTabOptions';
import { GradeTabOptions } from './options/GradeTabOptions';
import { TabBarOptions } from './options/TabBarOptions';
import { UserTabOptions } from './options/UserTabOptions';
import { DarkTheme } from './themes/DarkTheme';
import { ColorTheme } from './contexts/ColorTheme';
import { RootStackParamList } from './types/NavigationTypes';

const Tab = createBottomTabNavigator<RootStackParamList>();

// bundesländer sortieren
// bilder für noten

const Content: React.FC = () => {

  const { navigationTheme }: any = useContext(ColorTheme)

  const [authenticated, setAuthenticated] = useState(false);
  const [{ data, fetching }] = useMe();
  const [me, setMe] = useState(data?.me);

  useEffect(() => {
    if (data?.me !== null && typeof data?.me !== 'undefined') {
      setMe(data.me);
      setAuthenticated(true);
    };
  }, [fetching]);
  
  return (
    <Auth.Provider value={{ setAuthenticated, user: me, setMe }}>
      <NavigationContainer theme={navigationTheme}>
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
      <ColorTheme.Provider value={DarkTheme}>
        <Content/>
      </ColorTheme.Provider>
    </Provider>
  );
};

export default App;