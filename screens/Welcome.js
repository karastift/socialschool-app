import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQuery } from "urql";
import configData from "../config.json";

import LoginButton from '../objects/LoginButton';
import LogoutButton from '../objects/LogoutButton';
import UserPageButton from '../objects/UserPageButton';
import CreateButton from '../objects/CreateButton';
import PostPreview from '../objects/PostPreview';
import { ActivityIndicator } from 'react-native';
import LOGOUT_MUTATION from '../graphql/mutations/LogoutMutation';
import ME_QUERY from '../graphql/queries/MeQuery';
import POSTS_QUERY from '../graphql/queries/PostsQuery';

const Welcome = ({ navigation, route }) => {

    const [isRefreshing, setRefreshing] = useState(false);

    const [{ data: postData, fetching: postFetching, error: postError }, reloadPosts] = useQuery({
        query: POSTS_QUERY,
    });

    const [{ data: meData, fetching: meFetching, error: meError }, reloadMe] = useQuery({
        query: ME_QUERY,
    });

    const [{fetching: logoutFetching}, logout] = useMutation(LOGOUT_MUTATION);

    const refresh = () => {
        setRefreshing(true);
        reloadPosts({ requestPolicy: 'network-only' });
        setRefreshing(false);
    };

    useEffect(() => {
        reloadMe({ requestPolicy: 'network-only' });
    }, [route.params]);
 
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <LinearGradient 
                    style={styles.headerBackground}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    colors={['transparent', 'transparent']}
                    locations={[0, 1]}
                >
                    {typeof meData !== 'undefined' && typeof meData.me !== 'undefined' && meData.me !== null ? (
                        <LogoutButton style={styles.loginButton} onPress={() => { logout(); reloadMe({ requestPolicy: 'network-only' }); }}/>
                    ) : (
                        <LoginButton style={styles.loginButton} onPress={()=>{ navigation.navigate('Login');}}/>
                    )}
                    {typeof meData !== 'undefined' && typeof meData.me !== 'undefined' ? (
                        <UserPageButton style={styles.userButton} username={meData.me !== null ? meData.me.username : "user"} onPress={()=>{UserPageButton>navigation.navigate('User');}}/>
                    ) : (
                        <UserPageButton style={styles.userButton} username="user" onPress={()=>{UserPageButton>navigation.navigate('User');}}/>
                    )}
                </LinearGradient>
                <CreateButton style={styles.createButton} onPress1={()=>{navigation.navigate('DiscussionpostCreation');}} onPress2={()=>{navigation.navigate('GradepostCreation');}}/>
                
                {!postFetching && !postError ? (
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
                        {postData.posts.map((post, index) => {
                            return (
                                <TouchableOpacity key={'forpress'+index.toString()} onPress={() => navigation.navigate('Discussionpost', { id: post.data.discussionpostId})}>
                                    {/* <PostPreview key={index} 
                                                body={post.data.discussionpostBody} 
                                                title={post.data.discussionpostTitle} 
                                                id={post.data.discussionpostId} 
                                                username={post.data.discussionpostUsername} 
                                                upvotes={post.data.discussionpostUpvotes}
                                                status={post.data.discussionpostStatus}
                                                style={styles.discussionpostWrapper}
                                    /> */}
                                    <PostPreview key={index} 
                                                body={post.title.repeat(5)} 
                                                title={post.title} 
                                                id={post.id} 
                                                username={"username"} 
                                                upvotes={0}
                                                status={"public"}
                                                style={styles.discussionpostWrapper}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                ) : postError ? (
                    <Text>{postError.message}</Text>
                ) : (
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
                        <ActivityIndicator color="red" size="large" style={styles.loading}/>
                    </ScrollView>
                )
                }
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
        alignContent: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight,
        color: 'white'
    },
    userButton: {
        position: 'absolute',
        width: 55,
        height: 50,
        top: 5,
        left: 5
    },
    loginButton: {
        position: 'absolute',
        width: 55,
        height: 50,
        top: 5,
        right: 40,
    },
    createButton: {
        width: 200,
        marginTop: 50,
        marginLeft: 70,
        height: 30,
    },
    loginText: {
        color: 'grey',
        fontWeight: 'bold',
        zIndex: 3
    },
    headerBackground: {
        width: windowWidth,        
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        flexWrap:'wrap',
        height: 10,
        zIndex: 2
    },
    scrollView: {
        zIndex: 1,
        marginTop: 20,
    },
    discussionpostWrapper: {
        marginBottom: 10,
    },
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
    loading: {
        marginTop: '60%',
        width: windowWidth-30,
        
    }
});