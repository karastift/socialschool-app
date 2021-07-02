import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useMe } from "../../graphql/queries/useMe";
import { LoginStack } from "./LoginStack/LoginStack";
import { RegisterStack } from "./RegisterStack/RegisterStack";

const Stack = createStackNavigator();

const StackScreenOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerTintColor: 'red',
};

export const AccountStack = ({ navigation }: any) => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginStack} options={StackScreenOptions}/>
      <Stack.Screen name="Register" component={RegisterStack} options={StackScreenOptions}/>
    </Stack.Navigator>
  );
};