import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';



const PostPreview = (props) => {
    let username = props.username;
    let status = props.status;
    let created = props.created;
    let upvotes = props.upvotes;
    let title = props.title;
    let body = props.body.substring(0, 1300);
    let id = parseInt(props.id);
    let key = parseInt(props.index);
    return (
        <View key={key} style={props.style}>
            <View key={'post'+key.toString()} style={styles.discussionpost}>
                <Text key={'title'+key.toString()} style={styles.discussionpostTitle}>{title}</Text>
                <Text key={'break'+key.toString()}> </Text>
                <Text key={'body'+key.toString()} style={styles.discussionpostBody}>{body}...</Text>
                <Text key={'info'+key.toString()} style={styles.discussionpostInfo}>posted by <Text style={styles.discussionpostInfo2}>{username}</Text> | {status == 'public' ? (<Text>{status}</Text>) : (<Text style={styles.discussionpostInfo2}>{status}</Text>)} | {upvotes}</Text>
            </View>
        </View>
    );
};

export default PostPreview;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        borderRadius: 24,
        alignItems: 'center',
        width: windowWidth-30,
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
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10
    },
    discussionpostBody: {
        color: 'white',
        textAlign: 'center'
    },
});