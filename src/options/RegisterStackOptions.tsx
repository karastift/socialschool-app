import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/SubmitButton";
import { getBackLogin } from "../utils/getBackLogin";
import { Platform } from "react-native";

export const RegisterStackOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => navigation.navigate('Login')} text='login' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginRight: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => getBackLogin(route, 'Register', navigation )} icon='arrow-left' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});