import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Feed } from "./Feed/Feed";
import { PostStack } from "./PostStack/PostStack";
import { FeedScreenOptions } from "../../options/FeedScreenOptions";
import { PostStackOptions } from "../../options/PostStackOptions";

const Stack = createStackNavigator();

export const FeedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} options={FeedScreenOptions}/>
      <Stack.Screen name="Post" component={PostStack} options={PostStackOptions}/>
    </Stack.Navigator>
  );
};