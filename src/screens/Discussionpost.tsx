import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { useMutation, useQuery } from "urql";
import { usePost } from '../graphql/queries/usePost';
import { usePostComments } from '../graphql/queries/usePostComments';
import Comment from "../objects/Comment";
import { CommentArea } from '../objects/CommentArea';
import { Post } from '../objects/Post';
import styles from "../styles/PostStyles";
import { CommentTypes } from '../types/objectProps/CommentTypes';
import { DiscussionpostProps } from '../types/screenProps/DiscussionpostTypes';

const Discussionpost = ({ navigation, route }: DiscussionpostProps) => {

  const [{ data: postData, fetching: postFetching }, reloadPost] = usePost({ id: route.params.id });

  const [variables] = useState({ limit: 15, postId: route.params.id, cursor: null });
  const [{ data: commentsData, fetching: commentsFetching }, reloadPostComments] = usePostComments(variables);

  const [, createComment] = useMutation(`
  mutation CreatePostComment($postId: Int!, $text: String!){
    createPostComment(postId: $postId, text: $text) {
        postComment {
            id
            postId
            text
        }
        errors {
            message
            field
        }
    }
  }
  `);

  const submitComment = async (enteredText: string) => {
    if (enteredText) {
      createComment({ postId: route.params.id, text: enteredText });
      return true;
    }
    return false;
  };

  const refresh = () => {
    reloadPost({ requestPolicy: 'network-only' });
    reloadPostComments({ requestPolicy: 'network-only' });
  };

  useEffect(() => {
    refresh();
  }, [route.params])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {!postFetching && !commentsFetching ? (
          <View>
            <Post
              title={postData.post.title}
              body={postData.post.text}
              username={postData.post.creator.username}
              status={postData.post.status}
              upvotes={postData.post.points}
            />
            <CommentArea onChangeText={submitComment}/>
            <ScrollView
              style={styles.commentsArea}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={refresh}
                />
              }
            >
              {commentsData.postComments.postComments.map((comment: CommentTypes, index: number) => {
                return (
                  <Comment
                    key={index}
                    username={comment.creator.username}
                    body={comment.text}
                  />
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <View>
            <ActivityIndicator color="red" style={styles.loading}/>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Discussionpost;