import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export type WelcomeProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};