import { useCardAnimation } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import configData from "../config.json";

const Discussionpost = ({ navigation, route }) => {
    
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [commentArray, setArray] = useState([]);
    let commentIdArray = [];

    const host = configData.serverData.serverUrl;
    const getPostUrl = configData.serverData.getPostUrl;
    const getCommentUrl = configData.serverData.getCommentUrl;

    const getComments = async () => {
        setArray([]);
        commentIdArray.map((id, index) => {
            try {

                if (route.params.token == 'noToken') {
                    console.log('no token given');
                }
                else {
                    fetch(
                        `${host}${getCommentUrl}?token=${route.params.token}&commentId=${id}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                                    'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then((data) => {
                        setArray(commentArray => [...commentArray, data.data]);
                        console.log(data.data)
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        });
        console.log(commentArray.length);
        console.log(commentArray);
    }

    const getData = async () => {
        try {
            if (route.params.token == 'noToken') {
                console.log('no token given');
            }
            else {
                fetch(
                    `${host}${getPostUrl}?token=${route.params.token}&discussionpostId=${route.params.id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                                'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then((responseJson) => {
                setTitle(responseJson.data.discussionpostTitle);
                setBody(responseJson.data.discussionpostBody);
                commentIdArray = responseJson.data.commentIds;
                })
                .then(() => { getComments(); })
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    
    useEffect(()=>{ getData(); }, []);

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
        return (
            <View style={styles.commentWrapper} key={index}>
                <View style={styles.comment}>
                    <Text style={styles.commentInfo} key={index.toString()+'info'}>{username} {randWord}</Text>
                    <Text style={styles.commentBody} key={index.toString()+'body'}>{body}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header} onPress={() => navigation.navigate('Welcome')}>Discuss My School</Text>
                <Post/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {commentArray.map((comment, index) => {
                        return (
                            <Comment
                                username={comment.commentUserId}
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