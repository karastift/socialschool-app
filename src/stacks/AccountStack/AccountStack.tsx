import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useMe } from "../../graphql/queries/useMe";
import { SubmitButton } from "../../objects/Form/SubmitButton";
import { LoginStack } from "./LoginStack/LoginStack";
import { RegisterStack } from "./RegisterStack/RegisterStack";

const Stack = createStackNavigator();

const LoginScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
  },
  headerLeft: () => (
    <SubmitButton onSubmit={() => navigation.navigate('Register')} icon='arrow-left' style={{
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
  headerLeft: () => (
    <SubmitButton onSubmit={() => navigation.navigate('Login')} icon='arrow-left' style={{
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