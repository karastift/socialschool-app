import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ProfileScreenOptions } from "../../options/ProfileScreenOptions";
import { UserStackProps } from "../../types/NavigationTypes";
import { EditProfile } from "./Profile/EditProfile";
import { Profile } from "./Profile/Profile";

const Stack = createStackNavigator();

export const UserStack: React.FC<UserStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={ProfileScreenOptions}/>
      <Stack.Screen name="EditProfile" component={EditProfile}/>
    </Stack.Navigator>
  );
};