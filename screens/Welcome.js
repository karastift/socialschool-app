import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView, Button, RefreshControl, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import configData from "../config.json";

const host = configData.serverData.serverUrl;
const getPostsUrl = configData.serverData.getPostsUrl;

const Welcome = ({ navigation, token }) => {

    let [discussionPostArray, setArray] = useState([]);

    let getData = async () => {
        try {
            if (token == 'noToken') {
                console.log('no token given');
            }
            else {
                let response = await fetch(
                    `${host}${getPostsUrl}?token=${token}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                                'Content-Type': 'application/json'
                    }
                });
                let responseJson = await response.json();
                setArray(responseJson.postData);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=>{ getData(); }, []);

    const PostPreview = (props) => {
        let username = props.username;
        let created = props.created;
        let upvotes = props.upvotes;
        let title = props.title;
        let body = props.body.substring(0, 1300);
        let id = parseInt(props.id);
        let key = parseInt(props.index);
        return (
            <View key={key} style={styles.discussionpostWrapper}>
                <View key={'post'+key.toString()} style={styles.discussionpost}>
                    <Text key={'title'+key.toString()} style={styles.discussionpostTitle}>{title}</Text>
                    <Text key={'break'+key.toString()}> </Text>
                    <Text key={'body'+key.toString()} style={styles.discussionpostBody}>{body}...</Text>
                    <Text key={'info'+key.toString()} style={styles.discussionpostInfo}>posted by {username} | {upvotes}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerBackground}>
                    <Text style={styles.headerText}>Discuss My School</Text>
                    {/*<Button
                        title="Go to Sign In"
                        onPress={() => navigation.navigate('Login')}
                    />*/}
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {discussionPostArray.map((post, index) => {
                        return (
                            <TouchableOpacity key={'forpress'+index.toString()} onPress={() => navigation.navigate('Discussionpost', { id: post.data.discussionpostId, token: token })}>
                                <PostPreview key={index} 
                                            body={post.data.discussionpostBody} 
                                            title={post.data.discussionpostTitle} 
                                            id={post.data.discussionpostId} 
                                            username={post.data.discussionpostUsername} 
                                            upvotes={post.data.discussionpostUpvotes}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;


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
        color: 'white'
    },
    headerText: {
        color: 'red',
        fontSize: 30
        
    },
    headerBackground: {
        width: windowWidth,        
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 5
    },
    scrollView: {
        zIndex: 1,
        marginTop: 120,
    },
    discussionpostWrapper: {
        marginBottom: 10,
    },
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        borderRadius: 24,
        alignItems: 'center',
        width: windowWidth-40,
        maxHeight: 700,
        overflow: 'hidden',
        paddingRight: 6,
        paddingLeft: 6
        
    },
    discussionpostInfo: {
        color: 'grey',
        textAlign: 'left',
        fontWeight: '300',
        marginTop: 10
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
    discussionpostLink: {
        width:  windowWidth-40,
        color: 'red',
        marginBottom: 5,
        paddingTop: 10,
        backgroundColor : 'rgb(40,40,40)',
        backgroundColor: 'linear-gradient(0deg, rgba(40,40,40,1) 39%, rgba(255,0,0,0) 100%)',
        textAlign: 'center'
    },
    load: {
        marginTop: '60%',
        marginBottom: '40%'
    }
});