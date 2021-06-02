import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { useQuery } from "urql";
import POST_COMMENT_QUERY from "../graphql/queries/PostCommentsQuery";
import POST_QUERY from "../graphql/queries/PostQuery";
import Comment from "../objects/Comment";
import { Post } from '../objects/Post';
import styles from "../styles/PostStyles";
import { CommentTypes } from '../types/objectProps/CommentTypes';
import { DiscussionpostProps } from '../types/screenProps/DiscussionpostTypes';

const Discussionpost = ({ navigation, route }: DiscussionpostProps) => {

    const [{ data: postData, fetching: postFetching, error: postError }, reloadPost] = useQuery({
        query: POST_QUERY,
        variables: {id: route.params.id},
    });
    const [variables, _] = useState({ limit: 15, postId: route.params.id, cursor: null });
    const [{ data: commentsData, fetching: commentsFetching, error: commentsError }, reloadPostComments] = useQuery({
        query: POST_COMMENT_QUERY,
        variables
    });

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
                        <ScrollView
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