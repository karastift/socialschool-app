import React, { useState } from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { TitleForm } from "./CreatePost/TitleForm";
import { BodyForm } from "./CreatePost/BodyForm";
import { useMutation } from "urql";
import CREATE_POST_MUTATION from "../../../../../graphql/mutations/CreatePostMutation";
import { StatusForm } from "./CreatePost/StatusForm";
import { realName } from "../../../../../utils/realName";

const Stack = createStackNavigator();

const CreatePostStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export const CreatePostStack = ({ navigation, route }: any) => {

  const [title, setTitle] = useState('');
  const [text, setBody] = useState('');
  const [status, setStatus] = useState('');
  const [,createPost] = useMutation(CREATE_POST_MUTATION);

  const submit = async () => {
    createPost({ input: {
      title,
      text,
      status,
    } }).then((res) => {
      const { data, error } = res;
      
      if (error) {
        console.log(error);
      }
      else if (data.createPost.errors) {
        const { field, message } = data.createPost.errors[0];
        navigation.navigate(realName(field), { message });  

      }
      else {
        navigation.navigate('Feed');
      }
    });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name='Title' options={CreatePostStackOptions}>
        { props => <TitleForm {...props} setTitle={setTitle}/>}
      </Stack.Screen>
      <Stack.Screen name='Text' options={CreatePostStackOptions}>
        { props => <BodyForm {...props} setBody={setBody}/>}
      </Stack.Screen>
      <Stack.Screen name='Status' options={CreatePostStackOptions}>
        { props => <StatusForm {...props} setStatus={setStatus} onSubmit={submit}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};