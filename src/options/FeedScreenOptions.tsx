import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/SubmitButton";
import { getBack } from "../utils/getBack";

export const FeedScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitle: 'Social School',
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => null} icon='plus' style={{
      height: 40,
      width: 60,
      marginBottom: 25,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => null} icon='heart' style={{
      height: 40,
      width: 60,
      marginBottom: 25,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});