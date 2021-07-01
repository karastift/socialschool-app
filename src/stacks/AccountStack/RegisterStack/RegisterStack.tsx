import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PasswordForm } from "./Register/PasswordForm";
import { SchoolForm } from "./Register/SchoolForm";
import { UsernameForm } from "./Register/UsernameForm";

const Stack = createStackNavigator();

export const RegisterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Username" component={UsernameForm}/>
      <Stack.Screen name="Password" component={PasswordForm}/>
      <Stack.Screen name="School" component={SchoolForm}/>
    </Stack.Navigator>
  );
};