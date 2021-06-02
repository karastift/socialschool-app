import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SubjectBoard'
>;

export type SubjectBoardProps = {
  navigation: ProfileScreenNavigationProp;
};