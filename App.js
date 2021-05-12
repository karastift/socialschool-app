import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, createClient, dedupExchange, fetchExchange } from "urql"
import { cacheExchange } from '@urql/exchange-graphcache';

import ME_QUERY from "./graphql/queries/MeQuery";


import Welcome from './screens/Welcome';
import Discussionpost from './screens/Discussionpost';
import Login from './screens/Login';
import Register from './screens/Register';
import Error from './screens/Error';
import DiscussionpostCreation from './screens/DiscussionpostCreation';
import GradepostCreation from './screens/GradepostCreation';
import User from './screens/User';
import LogoutButton from './objects/LogoutButton';

const RootStack = createStackNavigator();

function betterUpdateQuery(
    cache,
    qi,
    result,
    fn,
) {
    return cache.updateQuery(qi, data => fn(result, data));
}

const client = createClient({
    url: 'http://192.168.178.113:4000/graphql',
    fetchOptions: {
        credentials: 'include',
        exchanges: [dedupExchange, cacheExchange({
            updates: {
                Mutation: {
                    logout: (_result, args, cache, info) => {
                        betterUpdateQuery(
                            cache,
                            {query: ME_QUERY},
                            _result,
                            () => ({me: null})
                        );
                    },
                    login: (_result, args, cache, info) => {
                        betterUpdateQuery(
                            cache,
                            { query: ME_QUERY },
                            _result,
                            (result, query) => {
                                if (result.login.errors) {
                                    return query;
                                }
                                else {
                                    return {
                                        me: result.login.user,
                                    };
                                }
                            }
                        );
                    },
                    register: (_result, args, cache, info) => {
                        betterUpdateQuery(
                            cache,
                            { query: ME_QUERY },
                            _result,
                            (result, query) => {
                                if (result.register.errors) {
                                    return query;
                                }
                                else {
                                    return {
                                        me: result.register.user,
                                    };
                                }
                            }
                        );
                    },
                },
            },
        }), fetchExchange],
    }
});

const App = () => {

    const [error, setError] = useState('');

    return (
        <Provider value={client}>
            <NavigationContainer>
                <RootStack.Navigator>
                {error.length != 0 ? (
                    <RootStack.Screen name="Error" options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerTransparent: true,
                        headerBackTitleStyle: {color: 'white'},
                    }}>
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
                    <RootStack.Screen name="DiscussionpostCreation" options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        title: 'new discussion'
                    }}>
                        {(props) => (
                            <DiscussionpostCreation {...props}/>
                        )}
                    </RootStack.Screen>
                    <RootStack.Screen name="GradepostCreation" options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        title: 'new grade'
                    }}>
                        {(props) => (
                            <GradepostCreation {...props}/>
                        )}
                    </RootStack.Screen>
                    <RootStack.Screen name="User" options={{
                        headerTitleStyle: {color: 'red', fontWeight: '700'},
                        headerBackTitleStyle: {color: 'white'},
                        headerTransparent: true,
                        title: 'userpage'
                    }}>
                        {(props) => (
                            <User {...props}/>
                        )}
                    </RootStack.Screen>
                    <RootStack.Screen name="Logout" component={LogoutButton}/>
                </>
            )}
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
    
}
export default App;