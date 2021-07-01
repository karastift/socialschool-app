import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PasswordForm } from "./Login/PasswordForm";
import { SchoolForm } from "./Login/SchoolForm";
import { UsernameForm } from "./Login/UsernameForm";

const Stack = createStackNavigator();

export const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Username" component={UsernameForm}/>
      <Stack.Screen name="Password" component={PasswordForm}/>
      <Stack.Screen name="School" component={SchoolForm}/>
    </Stack.Navigator>
  );
};