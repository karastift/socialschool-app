import React from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

export const FeedTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => (
    <Icon name='message-circle' color={color} size={30}/>
  ),
  title: '',
};