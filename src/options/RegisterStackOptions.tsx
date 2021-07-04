import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/SubmitButton";
import { getBack } from "../utils/getBack";

export const RegisterStackOptions = ({ navigation, route }: any): StackNavigationOptions => ({
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