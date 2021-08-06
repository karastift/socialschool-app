import React, { useState } from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { Post } from "./Post/Post";
import { EditPost } from "./Post/EditPost";
import { useMutation } from "urql";
import CREATE_POST_COMMENT_MUTATION from "../../../graphql/mutations/CreatePostComment";
import { CreatePostStack } from "./Post/CreatePostStack/CreatePostStack";

const Stack = createStackNavigator();

const PostStackScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

export const PostStack: React.FC = ({ route }: any) => {
  const { postId } = route.params;

  const [comment, setComment] = useState('');
  const [,postComment] = useMutation(CREATE_POST_COMMENT_MUTATION);

  const submitComment = () => postComment({ postId, text: comment });

  return (
    <Stack.Navigator>
      <Stack.Screen name='Post' options={PostStackScreenOptions} initialParams={{ postId }}>
        { props => <Post {...props} setComment={setComment} submitComment={submitComment}/>}
      </Stack.Screen>
      <Stack.Screen name='Edit' options={PostStackScreenOptions} initialParams={{ postId }}>
        { props => <EditPost {...props}/>}
      </Stack.Screen>
      <Stack.Screen name='Create' options={PostStackScreenOptions}>
        { props => <CreatePostStack {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};