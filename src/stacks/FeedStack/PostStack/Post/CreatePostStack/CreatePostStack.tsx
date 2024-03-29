import React, { useState } from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { TitleForm } from "./CreatePost/TitleForm";
import { BodyForm } from "./CreatePost/BodyForm";
import { useMutation } from "urql";
import CREATE_POST_MUTATION from "../../../../../graphql/mutations/CreatePostMutation";
import { StatusForm } from "./CreatePost/StatusForm";
import { realName } from "../../../../../utils/realName";
import { PostInput } from "../../../../../types/PostInput";
import { CreatePostStackParamList, CreatePostStackProps } from "../../../../../types/NavigationTypes";

const Stack = createStackNavigator<CreatePostStackParamList>();

const CreatePostStackOptions: StackNavigationOptions = {
  headerShown: false,
};

const validatePostInput = (input: PostInput): { field: string, message: string } | undefined => {
  const { title, text, status } = input;
  if (!title) return { field: 'title', message: 'Please enter a title.' };
  if (!text) return { field: 'text', message: 'Please enter your text.' };
  if (!status) return { field: 'status' , message: 'This should not have happened. Please restart the app or contact me for help.' };
  if (title.length < 3) return { field: 'title', message: 'Your title is too short.' };
  if (text.length < 5) return { field: 'text', message: 'Your text is too short.' };
};

export const CreatePostStack: React.FC<CreatePostStackProps> = ({ navigation }) => {

  const [title, setTitle] = useState('');
  const [text, setBody] = useState('');
  const [status, setStatus] = useState('');
  const [,createPost] = useMutation(CREATE_POST_MUTATION);

  const submit = async () => {

    const input: PostInput = {
      title,
      text,
      status: status.trimEnd(),
    };

    const clientError = validatePostInput(input);
    if (clientError) {
      const { field, message } = clientError;
      console.log(message);
      return navigation.navigate(realName(field) as any);
    }

    const { data, error } = await createPost({ input });
   
    if (error) {
      navigation.navigate('Title');
    }
    else if (data.createPost.errors) {
      const { field } = data.createPost.errors[0];
      navigation.navigate(realName(field) as any);
    }
    else {
      navigation.goBack();
    }
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