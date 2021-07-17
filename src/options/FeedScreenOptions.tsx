import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/SubmitButton";
import { Platform } from "react-native";

export const FeedScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitle: 'Social School',
  headerTransparent: true,
  headerTintColor: 'red',
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
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => null} icon='heart' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});