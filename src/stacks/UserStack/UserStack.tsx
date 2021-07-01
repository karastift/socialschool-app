import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EditProfile } from "./Profile/EditProfile";
import { Profile } from "./Profile/Profile";

const Stack = createStackNavigator();

export const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Edit" component={EditProfile}/>
    </Stack.Navigator>
  );
};