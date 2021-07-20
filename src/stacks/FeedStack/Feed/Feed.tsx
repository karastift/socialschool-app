import React, { useContext, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { ColorTheme } from '../../../contexts/ColorTheme';
import { usePosts } from '../../../graphql/queries/usePosts';
import PostPreview from '../../../objects/PostPreview';

export const Feed = ({ navigation, route }: any) => {

    const styles = useStyles();
    const [isRefreshing, setRefreshing] = useState(false);
    const [variables, setVariables] = useState({ limit: 20, cursor: null });

    const [{ data: postData, fetching: postFetching, error: postError }, reloadPosts] = usePosts(variables);

    const refresh = () => {
        setRefreshing(true);
        reloadPosts({ requestPolicy: 'network-only' });
        setRefreshing(false);
    };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {!postError && !postFetching
        ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refresh}
            />
          }
        >

          {postData.posts.posts.map((post: any) => {
            return (
              <TouchableOpacity
                key={post.id}
                onPress={() => navigation.navigate('Post', { postId: post.id })}
              >
                <PostPreview
                  key={post.id} 
                  title={post.title} 
                  body={post.textSnippet}
                  id={post.id} 
                  username={post.creator.username} 
                  upvotes={post.points}
                  status={post.status}
                  style={styles.discussionpostWrapper}
                />
              </TouchableOpacity>
            );
          })}

          {postData.posts.hasMore
          ? (
          <TouchableOpacity onPress={() => setVariables({ limit: variables.limit, cursor: postData.posts[postData.posts.length-1].createdAt })}>
              <Text style={styles.loadMore}>load more</Text>
          </TouchableOpacity>
          ) : <></>}
        </ScrollView>
        ) : postError ? (
                <PostPreview
                    key={1} 
                    title={"Sorry for the inconvenience."} 
                    body={postError.message}
                    username={"error"} 
                    upvotes={0}
                    status={"error"}
                    style={styles.discussionpostWrapper}
                />
        ) : <></>
        }
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {

  const { general } = useContext(ColorTheme)

  return StyleSheet.create({
    container: {
      zIndex: 0,
      flex: 1,
      alignItems: 'center',
    },
    scrollView: {
      zIndex: 1,
      marginTop: Platform.OS === 'ios' ? 20 : 120,
    },
    discussionpostWrapper: {
      marginBottom: 10,
    },
    discussionpost: {
      backgroundColor: 'rgb(40, 40, 40)',
      borderRadius: 24,
      alignItems: 'center',
      // width: windowWidth-30,
      maxHeight: 700,
      overflow: 'hidden',
      paddingHorizontal: 6
        
    },
    discussionpostInfo: {
      color: 'grey',
      textAlign: 'left',
      fontWeight: '300',
      marginTop: 10
    },
    discussionpostInfo2: {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    discussionpostTitle: {
      color: general.text,
      fontWeight: 'bold',
      marginTop: 5,
      marginLeft: 10
    },
    discussionpostBody: {
      color: general.text,
      textAlign: 'center'
    },
    loading: {
      marginTop: '60%',
      // width: windowWidth-30,
    },
    loadMore: {
      textAlign: 'center',
      color: 'red',
    },
  });
};