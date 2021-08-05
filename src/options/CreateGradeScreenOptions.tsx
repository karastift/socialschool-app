import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/FormElements/SubmitButton";
import { Platform, View } from "react-native";

export const CreateGradeScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerRight: () => (
    <View style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginRight: 10,
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => navigation.goBack()} icon='arrow-left' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
    }}/>
  ),
});