import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "urql";
import { Auth } from "../../../contexts/Auth";
import LOGIN_MUTATION from "../../../graphql/mutations/LoginMutation";
import { realName } from "../../../utils/realName";
import { PasswordForm } from "./Login/PasswordForm";
import { SchoolForm } from "./Login/SchoolForm";
import { UsernameForm } from "./Login/UsernameForm";

const Stack = createStackNavigator();

const StackScreenOptions = ({ navigation }: any): StackNavigationOptions => ({
  headerShown: false,
});

export const LoginStack = ({ navigation }: any) => {

  const { setAuthenticated }: any = useContext(Auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');

  const [, login] = useMutation(LOGIN_MUTATION);

  const submit = () => login({
    usernameOrEmail: username,
    password,
    school
  }).then((res) => {
    const { data, error } = res;
    if (error) {
      console.log(error);
    }
    else if (data.login.errors) {
      const { field, message } = data.login.errors[0];
      navigation.navigate(realName(field), { message });  

    }
    else {
      setAuthenticated(true);
    }
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