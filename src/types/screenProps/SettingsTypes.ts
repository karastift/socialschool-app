import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export type SettingsProps = {
  navigation: SettingsNavigationProp;
};