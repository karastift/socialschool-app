import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type ErrorRouteProp = RouteProp<RootStackParamList, 'Error'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Error'
>;

export type ErrorProps = {
  route: ErrorRouteProp;
  navigation: ProfileScreenNavigationProp;
};