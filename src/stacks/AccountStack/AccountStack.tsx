import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginStack } from "./LoginStack/LoginStack";
import { RegisterStack } from "./RegisterStack/RegisterStack";

const Stack = createStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginStack}/>
      <Stack.Screen name="Register" component={RegisterStack}/>
    </Stack.Navigator>
  );
};