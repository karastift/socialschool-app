import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type RegisterNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type RegisterProps = {
  navigation: RegisterNavigationProp;
};