import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/FormElements/SubmitButton";
import { Platform, View } from "react-native";

export const GradeSummaryScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitle: 'My Grades',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => null} icon='plus' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginRight: 10,
    }}/>
  ),
  // if headerLeft does not exist, the title would not be centered on android
  headerLeft: () => (
    <View style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
    }}/>
  ),
});