import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/SubmitButton";

export const GradeSummaryScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitle: 'My Grades',
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => null} icon='plus' style={{
      height: 40,
      width: 60,
      marginTop: 20,
      marginRight: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
  // headerLeft: () => (
  //   <SubmitButton onSubmit={() => null} icon='heart' style={{
  //     height: 40,
  //     width: 60,
  //      marginTop: 20,
  //      marginRight: 10,
  //     backgroundColor: 'rgb(50, 50, 50)',
  //   }}/>
  // ),
});