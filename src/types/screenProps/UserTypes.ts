import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type UserNavigationProp = StackNavigationProp<
  RootStackParamList,
  'User'
>;

export type UserProps = {
  navigation: UserNavigationProp;
};