import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SubmitButton } from "../objects/Form/FormElements/SubmitButton";
import { Platform } from "react-native";

export const FeedScreenOptions = ({ navigation, route }: any): StackNavigationOptions => ({
  headerTitle: 'Social School',
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 17,
    alignSelf: 'center',
  },
  headerRight: () => (
    <SubmitButton onSubmit={() => navigation.navigate('PostStack', { screen: 'CreatePostStack' })} icon='plus' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginRight: 10,
    }}/>
  ),
  headerLeft: () => (
    <SubmitButton onSubmit={() => null} icon='heart' style={{
      ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
      height: 40,
      width: 60,
      marginLeft: 10,
    }}/>
  ),
});