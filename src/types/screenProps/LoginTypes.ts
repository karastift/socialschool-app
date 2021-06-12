import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type LoginProps = {
  navigation: LoginNavigationProp;
};