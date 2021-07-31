import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { useContext } from "react";
import { Platform, View } from "react-native";
import { useMutation } from "urql";
import { Auth } from "../contexts/Auth";
import LOGOUT_MUTATION from "../graphql/mutations/LogoutMutation";
import { SubmitButton } from "../objects/Form/FormElements/SubmitButton";

export const ProfileScreenOptions = ({ navigation, route }: any): StackNavigationOptions => {

  const { setAuthenticated }: any = useContext(Auth);;
  const [,logout] = useMutation(LOGOUT_MUTATION);

  return {
    headerTitleStyle: {
      fontWeight: '800',
      fontSize: 17,
      alignSelf: 'center',
    },
    headerRight: () => (
      <SubmitButton onSubmit={() => null} icon='edit-3' style={{
        ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
        height: 40,
        width: 60,
        marginRight: 10,
      }}/>
    ),
    // if headerLeft does not exist, the title would not be centered on android
    headerLeft: () => (
      <SubmitButton onSubmit={() => {
        setAuthenticated(false);
        logout();
      }} icon='user-x' style={{
        ...Platform.OS === 'ios' ? { marginTop: 20 } : undefined,
        height: 40,
        width: 60,
        marginLeft: 10,
      }}/>
    ),
  };
};