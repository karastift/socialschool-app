import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Discussionpost'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Discussionpost'
>;

export type DiscussionpostProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};