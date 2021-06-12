import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type SubjectInfoRouteProp = RouteProp<RootStackParamList, 'SubjectInfo'>;

type SubjectInfoNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SubjectInfo'
>;

export type SubjectInfoProps = {
  route: SubjectInfoRouteProp;
  navigation: SubjectInfoNavigationProp;
};