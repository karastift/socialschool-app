import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

export const GradeTabOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ color }) => (
    <Icon name='pen-tool' color={color} size={26}/>
  ),
  title: '',
};