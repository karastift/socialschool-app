import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Post } from "./Post/Post";
import { EditPost } from "./Post/EditPost";

const Stack = createStackNavigator();

export const PostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post" component={Post}/>
      <Stack.Screen name="Edit" component={EditPost}/>
    </Stack.Navigator>
  );
};