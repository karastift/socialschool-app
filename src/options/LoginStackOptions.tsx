import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { SubmitButton } from "../objects/Form/SubmitButton";
import { getBack } from "../utils/getBack";

export const LoginStackOptions = ({ navigation, route }: any): StackNavigationOptions => ({
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
      marginTop: 20,
      marginRight: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => getBack(route, 'Login', navigation )} icon='arrow-left' style={{
      height: 40,
      width: 60,
      marginTop: 20,
      marginLeft: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});