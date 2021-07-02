import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "urql";
import { Auth } from "../../../contexts/Auth";
import LOGIN_MUTATION from "../../../graphql/mutations/LoginMutation";
import { PasswordForm } from "./Login/PasswordForm";
import { SchoolForm } from "./Login/SchoolForm";
import { UsernameForm } from "./Login/UsernameForm";

const Stack = createStackNavigator();

const StackScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

export const LoginStack = ({ navigation }: any) => {

  const { setAuthenticated }: any = useContext(Auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');

  const [{ data, fetching, error }, login] = useMutation(LOGIN_MUTATION);

  const submit = () => login({
    usernameOrEmail: username,
    password,
    school
  }).then(() => {
    setAuthenticated(true);
  });

  return (
    <Stack.Navigator>
      <Stack.Screen name="Username" options={StackScreenOptions}>
        { props => <UsernameForm {...props} setUsername={setUsername}/>}
      </Stack.Screen>
      <Stack.Screen name="Password" options={StackScreenOptions}>
        { props => <PasswordForm {...props} setPassword={setPassword}/>}
      </Stack.Screen>
      <Stack.Screen name="School" options={StackScreenOptions}>
        { props => <SchoolForm {...props} setSchool={setSchool} onSubmit={submit}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};