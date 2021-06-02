import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'User'
>;

export type UserProps = {
  navigation: ProfileScreenNavigationProp;
};