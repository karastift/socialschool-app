import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginStackOptions } from "../../options/LoginStackOptions";
import { RegisterStackOptions } from "../../options/RegisterStackOptions";
import { LoginStack } from "./LoginStack/LoginStack";
import { RegisterStack } from "./RegisterStack/RegisterStack";

const Stack = createStackNavigator();

export const AccountStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginStack} options={LoginStackOptions}/>
      <Stack.Screen name="Register" component={RegisterStack} options={RegisterStackOptions}/>
    </Stack.Navigator>
  );
};