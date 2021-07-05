import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { SubmitButton } from "../objects/Form/SubmitButton";

export const PostStackOptions = ({ navigation }: any): StackNavigationOptions => ({
  headerTransparent: true,
  headerTintColor: 'red',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerLeft: () => (
    <SubmitButton onSubmit={() => navigation.goBack()} icon='arrow-left' style={{
      height: 40,
      width: 60,
      marginTop: 20,
      marginLeft: 10,
      backgroundColor: 'rgb(50, 50, 50)',
    }}/>
  ),
});