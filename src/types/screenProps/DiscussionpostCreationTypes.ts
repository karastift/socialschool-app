import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DiscussionpostCreation'
>;

export type DiscussionpostCreationProps = {
  navigation: ProfileScreenNavigationProp;
};