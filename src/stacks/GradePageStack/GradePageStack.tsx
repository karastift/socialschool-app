import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreateGradeScreenOptions } from "../../options/CreateGradeScreenOptions";
import { GradeSummaryScreenOptions } from "../../options/GradeSummaryScreenOptions";
import { GradePageStackParamList, GradePageStackProps } from "../../types/NavigationTypes";
import { GradeStack } from "./GradeStack/GradeStack";
import { GradeSummary } from "./GradeSummary/GradeSummary";
import { SubjectGrades } from "./SubjectGrades/SubjectGrades";

const Stack = createStackNavigator<GradePageStackParamList>();

export const GradePageStack: React.FC<GradePageStackProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GradeSummary" component={GradeSummary} options={GradeSummaryScreenOptions}/>
      <Stack.Screen name="Grade" component={GradeStack} options={CreateGradeScreenOptions}/>
      <Stack.Screen name="SubjectGrades" component={SubjectGrades}/>
    </Stack.Navigator>
  );
};