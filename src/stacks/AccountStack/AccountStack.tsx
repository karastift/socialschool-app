import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useMe } from "../../graphql/queries/useMe";
import { SubmitButton } from "../../objects/Form/SubmitButton";
import { LoginStack } from "./LoginStack/LoginStack";
import { RegisterStack } from "./RegisterStack/RegisterStack";

const Stack = createStackNavigator();

const getBack = (route: any, type: string, navigation: any) => {
  const name = getFocusedRouteNameFromRoute(route);
  
  if (typeof name === 'undefined' || name === 'Username') return;

  if (typeof name === 'undefined') return;

  if (type === 'Register') {
    const screens = ['Username', 'Email', 'Password', 'School'];
    return navigation.navigate(screens[screens.indexOf(name) - 1]);
  }
  const screens = ['Username', 'Password', 'School'];
  return navigation.navigate(screens[screens.indexOf(name) - 1]); 
};

const LoginScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => navigation.navigate('Register')} text='register' style={{
      height: 40,
      width: 60,
      marginBottom: 25,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => getBack(route, 'Login', navigation )} icon='arrow-left' style={{
      height: 40,
      width: 60,
      marginBottom: 25,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});

const RegisterScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => navigation.navigate('Login')} text='login' style={{
      height: 40,
      width: 60,
      marginBottom: 25,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => getBack(route, 'Register', navigation )} icon='arrow-left' style={{
      height: 40,
      width: 60,
      marginBottom: 25,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});

export const AccountStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginStack} options={LoginScreenOptions}/>
      <Stack.Screen name="Register" component={RegisterStack} options={RegisterScreenOptions}/>
    </Stack.Navigator>
  );
};