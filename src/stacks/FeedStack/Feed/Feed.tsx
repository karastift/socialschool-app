import React, { useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { usePosts } from '../../../graphql/queries/usePosts';
import PostPreview from '../../../objects/PostPreview';
import styles from "../../../styles/WelcomeStyles";
// import { WelcomeProps } from '../../../types/screenProps/WelcomeTypes';

export const Feed = ({ navigation, route }: any) => {

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
                {!postError && !postFetching ? (
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
                        {postData.posts.hasMore ? (
                        <TouchableOpacity onPress={() => setVariables({ limit: variables.limit, cursor: postData.posts[postData.posts.length-1].createdAt })}>
                            <Text style={styles.loadMore}>load more</Text>
                        </TouchableOpacity>
                        ) : (<Text></Text>)}
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