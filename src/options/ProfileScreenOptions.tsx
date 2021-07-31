import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Platform, View } from "react-native";
import { SubmitButton } from "../objects/Form/FormElements/SubmitButton";

export const ProfileScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerRight: () => (
    <SubmitButton onSubmit={navigation.goBack} icon='edit-3' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
    }}/>
  ),
  // if headerLeft does not exist, the title would not be centered on android
  headerLeft: () => (
    <View style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginRight: 10,
    }}/>
  ),
});