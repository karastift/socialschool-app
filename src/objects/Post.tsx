import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    discussionpostWrapper: {
        marginBottom: 10,
        marginTop: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(26, 26, 26)',
        borderRadius: 24,
        alignItems: 'center',
        width: windowWidth-30,
        maxHeight: 700,
        overflow: 'hidden',
        paddingHorizontal: 6,
        borderColor: 'grey',
        borderWidth: 5,
        
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
        color: 'white',
        fontWeight: '900',
        marginTop: 5,
        marginLeft: 10,
    },
    discussionpostBody: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },

 
    loading: {
        marginTop: '60%',
        width: windowWidth-30,
    },
    postInfo: {
        color: 'grey',
        textAlign: 'left',
        fontWeight: '300',
        marginTop: 10
    },
    postInfo2: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    commentsArea: {
      marginLeft: 'auto',
      marginRight: 'auto',
    }, 
});

export default styles;