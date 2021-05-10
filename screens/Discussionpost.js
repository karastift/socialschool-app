import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import configData from "../config.json";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Discussionpost = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [commentArray, setArray] = useState([]);
    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    let commentIdArray = [];
    
    const Post = () => {
        return (
            <View style={styles.discussionpostWrapper}>
                <View style={styles.discussionpost}>
                    <Text style={styles.discussionpostTitle}>{title}</Text>
                    <Text> </Text>
                    <Text style={styles.discussionpostBody}>{body}</Text>
                </View>
            </View>
        );
    };
    const randomWords = ['says:', 'claims:', 'thinks:', 'believes:', 'is of the view:', 'is of the opinion:'];
    const Comment = (props) => {
        let username = props.username;
        let body = props.body;
        let index = props.id;
        let randWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        if (username.length != 0) {
            return (
                <View style={styles.commentWrapper} key={index}>
                    <View style={styles.comment} key={index.toString()+'view'}>
                        <Text style={styles.commentInfo} key={index.toString()+'info'}>{username} {randWord}</Text>
                        <Text style={styles.commentBody} key={index.toString()+'body'}>{body}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.commentWrapper} key={index}>
                <View style={styles.comment} key={index.toString()+'view'}>
                    <Text style={styles.commentInfo} key={index.toString()+'body'}>{body}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Post/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {commentArray.map((comment, index) => {
                        return (
                            <Comment
                                key={index.toString()+'commentHimSelf'}
                                username={comment.commentUsername}
                                body={comment.commentContent}
                                id={index}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default Discussionpost;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        flex: 1,
        backgroundColor: 'rgb(26, 26, 26)',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
        color: 'white',
        textAlign: 'left'
    },
    header: {
        zIndex: 2,
        width: windowWidth,
        color: 'red',
        paddingTop: 30,
        paddingBottom: 15,
        marginBottom: 15,
        marginLeft: 20,
        fontSize: 30,
        position: 'absolute',
        backgroundColor: 'rgb(26, 26, 26)',
    },
    discussionpostWrapper: {
        marginBottom: 10,
        marginTop: 100,
    },
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        alignItems: 'center',
        width: windowWidth-40,
        borderRadius: 24,
        textAlign: 'center',
        paddingRight: 6,
        paddingLeft: 6
        
    },
    discussionpostTitle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    discussionpostBody: {
        color: 'white',
        textAlign: 'center',
        paddingBottom: 10
    },
    load: {
        marginTop: '60%',
        marginBottom: '40%'
    },
    commentWrapper: {
        marginTop: 15,
    },
    comment: {
        color: 'white',
        backgroundColor: 'rgb(35, 35, 35)',
        // alignItems: 'center',
        width: windowWidth-40,
        borderRadius: 24,
        paddingRight: 6,
        paddingLeft: 6
        
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
});