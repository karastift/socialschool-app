import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import { SubmitButton } from "../objects/Form/FormElements/SubmitButton";

export const PostStackOptions = ({ navigation, route }: any): StackNavigationOptions => ({
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
    }}/>
  ),
});