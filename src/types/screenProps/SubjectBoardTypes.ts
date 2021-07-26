import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type SubjectBoardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SubjectBoard'
>;

export type SubjectBoardProps = {
  navigation: SubjectBoardNavigationProp;
};