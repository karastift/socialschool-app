import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/PostStyles";
import { PostProps } from "../types/objectProps/PostProps";

export const Post = (props: PostProps) => {
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