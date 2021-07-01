import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Feed } from "./Feed/Feed";
import { PostStack } from "./PostStack/PostStack";

const Stack = createStackNavigator();

export const FeedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed}/>
      <Stack.Screen name="Post" component={PostStack}/>
    </Stack.Navigator>
  );
};