import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { SubmitButton } from "../objects/Form/SubmitButton";

export const PostStackOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerLeft: () => (
    <SubmitButton onSubmit={navigation.goBack} icon='arrow-left' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});