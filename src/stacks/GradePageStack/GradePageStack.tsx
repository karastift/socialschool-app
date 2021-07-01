import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { GradeStack } from "./GradeStack/GradeStack";
import { GradeSummary } from "./GradeSummary/GradeSummary";
import { SubjectGrades } from "./SubjectGrades/SubjectGrades";

const Stack = createStackNavigator();

export const GradePageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Grade" component={GradeStack}/>
      <Stack.Screen name="SubjectGrades" component={SubjectGrades}/>
      <Stack.Screen name="GradeSummary" component={GradeSummary}/>
    </Stack.Navigator>
  );
};