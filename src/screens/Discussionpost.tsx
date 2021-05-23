import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl, SafeAreaView, ActivityIndicator } from 'react-native';
import { useQuery } from "urql";
import styles from "../styles/PostStyles";
import Comment from "../objects/Comment";
import POST_QUERY from "../graphql/queries/PostQuery";
import POST_COMMENT_QUERY from "../graphql/queries/PostCommentsQuery";

const Discussionpost = ({ navigation, route }) => {

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

    const Post = (props) => {
        const title = props.title;
        const body = props.body;
        const status = props.status;
        const upvotes = props.upvotes;
        const username = props.username;

        return (
            <View style={styles.discussionpostWrapper}>
                <View style={styles.discussionpost}>
                    <Text style={styles.discussionpostTitle}>{title}</Text>
                    <Text> </Text>
                    <Text style={styles.discussionpostBody}>{body}</Text>
                    <Text style={styles.postInfo}>posted by <Text style={styles.postInfo2}>{username}</Text> | {status == 'public' ? (<Text>{status}</Text>) : (<Text style={styles.postInfo2}>{status}</Text>)} | {upvotes}</Text>
                </View>
            </View>
        );
    };

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
                            {commentsData.postComments.postComments.map((comment, index) => {
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