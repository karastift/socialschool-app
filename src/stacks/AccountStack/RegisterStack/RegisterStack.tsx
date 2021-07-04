import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { useMutation } from "urql";
import { Auth } from "../../../contexts/Auth";
import REGISTER_MUTATION from "../../../graphql/mutations/RegisterMutation";
import { EmailForm } from "./Register/EmailForm";
import { PasswordForm } from "./Register/PasswordForm";
import { SchoolForm } from "./Register/SchoolForm";
import { UsernameForm } from "./Register/UsernameForm";

const Stack = createStackNavigator();

const StackScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

export const RegisterStack = ({ navigation }: any) => {

  const { setAuthenticated }: any = useContext(Auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');

  const [{ data, fetching, error }, register] = useMutation(REGISTER_MUTATION);

  function realName(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const submit = () => register({ options: {
    username,
    email,
    password,
    school
  }}).then((res) => {
    const { data, error } = res;
    if (error) {
      console.log(error);
    }
    else if (data.register.errors) {
      const { field, message } = data.register.errors[0];
      navigation.navigate(realName(field));

    }
    else {
      setAuthenticated(true);
    }
  });

  return (
    <Stack.Navigator>
      <Stack.Screen name='Username' options={StackScreenOptions}>
        { props => <UsernameForm {...props} setUsername={setUsername}/>}
      </Stack.Screen>
      <Stack.Screen name='Email' options={StackScreenOptions}>
        { props => <EmailForm {...props} setEmail={setEmail}/>}
      </Stack.Screen>
      <Stack.Screen name='Password' options={StackScreenOptions}>
        { props => <PasswordForm {...props} setPassword={setPassword}/>}
      </Stack.Screen>
      <Stack.Screen name='School'options={StackScreenOptions}>
        { props => <SchoolForm {...props} setSchool={setSchool} onSubmit={submit}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};