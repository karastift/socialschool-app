import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EditGrade } from "./Grade/EditGrade";
import { Grade } from "./Grade/Grade";

const Stack = createStackNavigator();

export const GradeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Grade" component={Grade}/>
      <Stack.Screen name="Edit" component={EditGrade}/>
    </Stack.Navigator>
  );
};