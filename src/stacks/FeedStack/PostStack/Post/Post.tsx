import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { usePost } from "../../../../graphql/queries/usePost";
import { usePostComments } from "../../../../graphql/queries/usePostComments";
import Comment from "../../../../objects/Comment";
import { CommentArea } from "../../../../objects/CommentArea";

export const Post = ({ navigation, route, setComment, submitComment }: any) => {

  const [{data, fetching, error}] = usePost({ id: route.params.postId });

  const [variables] = useState({ limit: 15, postId: route.params.postId, cursor: null });
  const [{ data: commentsData, fetching: commentsFetching, error: commentsError }, refreshComments] = usePostComments(variables);

  return (
    <ScrollView style={styles.container}>
      { !fetching && !error
        ? (
          <>
            <View style={styles.postWrapper}>
              <Text style={styles.postTitle}>{data.post.title}</Text>
              <Text> </Text>
              <Text style={styles.postText}>{data.post.text}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.info}>posted by</Text>
              <TouchableHighlight style={styles.nameButton} onPress={() => null}>
                <Text style={styles.buttonText}>{data.post.creator.username}</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.info}>for</Text>
              <TouchableHighlight style={styles.nameButton}>
                <Text style={styles.buttonText}>{data.post.status}</Text>
              </TouchableHighlight>
            </View>
            <CommentArea style={styles.createComment} onChangeText={text => setComment(text)} onSubmit={() => submitComment()} refresh={() => refreshComments({ requestPolicy: 'network-only' })}/>
            {!commentsFetching && !commentsError
            ? (
              <ScrollView
                style={styles.commentsArea}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => refreshComments({ requestPolicy: 'network-only' })}
                  />
                }
              >
                {commentsData.postComments.postComments.map((comment: any, index: number) => {
                  return (
                    <Comment
                      key={index}
                      username={comment.creator.username}
                      body={comment.text}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <ActivityIndicator color='red' style={styles.loading}/>
            )
            }
          </>
        )
        : (
          <ActivityIndicator color='red' style={styles.loading}/>
        )
      }
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: 'rgb(26, 26, 26)',
  },
  postWrapper: {
	width: windowWidth-30,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgb(35, 35, 35)',
    borderRadius: 24,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  postTitle: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10,
  },
  postText: {
    color: 'white',
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: '700',
  },
  loading: {
    marginTop: '60%',
    width: windowWidth-30,
  },
  infoWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 25,
  },
  info: {
    color: 'white',
    fontWeight: '800',
  },
  nameButton: {
    height: 30,
    marginLeft: 15,
    paddingHorizontal: 10,
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: 'rgb(35, 35, 35)',
  },
  buttonText: {
	color: 'white',
    textAlign: 'center',
    fontWeight: '800',
  },
  commentWrapper: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  comment: {
    color: 'white',
    backgroundColor: 'rgb(35, 35, 35)',
    width: windowWidth-40,
    borderRadius: 24,
    paddingRight: 6,
    paddingLeft: 6,
  },
  commentInfo: {
    color: '#bdbdbd',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15
  },
  commentBody: {
    color: '#a3a3a3',
    textAlign: 'center',
    paddingBottom: 10
  },
  commentsArea: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
  },
  createComment: {
    marginTop: 10
  },
});