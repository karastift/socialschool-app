import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type PostCreationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DiscussionpostCreation'
>;

export type DiscussionpostCreationProps = {
  navigation: PostCreationNavigationProp;
};