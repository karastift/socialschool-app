import React from "react";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

export const UserTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => (
    <Icon name='user' color={color} size={30}/>
  ),
  title: '',
};