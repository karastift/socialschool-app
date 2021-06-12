import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type GradeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GradepostCreation'
>;

export type GradepostProps = {
  navigation: GradeNavigationProp;
};