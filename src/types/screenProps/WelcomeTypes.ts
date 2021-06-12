import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type WelcomeRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

type WelcomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export type WelcomeProps = {
  route: WelcomeRouteProp;
  navigation: WelcomeNavigationProp;
};