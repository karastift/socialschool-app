import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { SubmitButton } from "../objects/Form/FormElements/SubmitButton";
import { getBackLogin } from "../utils/getBackLogin";

export const LoginStackOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => navigation.navigate('Register')} text='register' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginRight: 10,
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => getBackLogin(route, 'Login', navigation )} icon='arrow-left' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
    }}/>
  ),
});