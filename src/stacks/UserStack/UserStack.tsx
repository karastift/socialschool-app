import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ProfileScreenOptions } from "../../options/ProfileScreenOptions";
import { EditProfile } from "./Profile/EditProfile";
import { Profile } from "./Profile/Profile";

const Stack = createStackNavigator();

export const UserStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={ProfileScreenOptions}/>
      <Stack.Screen name="Edit" component={EditProfile}/>
    </Stack.Navigator>
  );
};