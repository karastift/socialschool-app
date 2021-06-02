import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type RegisterProps = {
  navigation: ProfileScreenNavigationProp;
};