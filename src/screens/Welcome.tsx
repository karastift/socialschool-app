import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useMutation, useQuery } from "urql";
import LOGOUT_MUTATION from '../graphql/mutations/LogoutMutation';
import ME_QUERY from '../graphql/queries/MeQuery';
import POSTS_QUERY from '../graphql/queries/PostsQuery';
import CreateButton from '../objects/CreateButton';
import LoginButton from '../objects/LoginButton';
import LogoutButton from '../objects/LogoutButton';
import PostPreview from '../objects/PostPreview';
import UserPageButton from '../objects/UserPageButton';
import styles from "../styles/WelcomeStyles";


const Welcome = ({ navigation, route }) => {

    const [isRefreshing, setRefreshing] = useState(false);
    const [variables, setVariables] = useState({ limit: 20, cursor: null });

    const [{ data: postData, fetching: postFetching, error: postError }, reloadPosts] = useQuery({
        query: POSTS_QUERY,
        variables,
    });

    const [{ data: meData, fetching: meFetching, error: meError }, reloadMe] = useQuery({
        query: ME_QUERY,
    });

    const [, logout] = useMutation(LOGOUT_MUTATION);

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
                    {typeof meData !== 'undefined' && meData?.me !== null ? (
                        <LogoutButton style={styles.loginButton} onPress={() => { logout(); reloadMe({ requestPolicy: 'network-only' }); }}/>
                    ) : (
                        <LoginButton style={styles.loginButton} onPress={()=>{ navigation.navigate('Login');}}/>
                    )}
                    {typeof meData !== 'undefined' && typeof meData.me !== 'undefined' ? (
                        <UserPageButton style={styles.userButton} username={meData.me !== null ? meData.me.username : "user"} onPress={()=>{navigation.navigate('User');}}/>
                    ) : (
                        <UserPageButton style={styles.userButton} username="user" onPress={()=>{navigation.navigate('User');}}/>
                    )}
                </LinearGradient>
                <CreateButton style={styles.createButton} onPress1={()=>{navigation.navigate('DiscussionpostCreation');}} onPress2={()=>{navigation.navigate('GradepostCreation');}}/>
                
                {!postFetching && !postError ? (
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={refresh}
                            />
                        }
                    >
                        {postData.posts.posts.map((post) => {
                            return (
                                <TouchableOpacity
                                    key={post.id}
                                    onPress={() => navigation.navigate(
                                        'Discussionpost',
                                        { id: post.id, justForRefresh: null }
                                    )}
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
                        <TouchableOpacity onPress={() => {setVariables({ limit: variables.limit, cursor: postData.posts[postData.posts.length-1].createdAt })}}>
                            <Text style={{textAlign: 'center', color: 'red'}}>load more</Text>
                        </TouchableOpacity>
                        ) : (<Text></Text>)}
                    </ScrollView>
                ) : postError ? (
                        <PostPreview
                            key={1} 
                            title={"Sorry for the inconvenience."} 
                            body={postError.message}
                            username={"error"} 
                            upvotes={"error"}
                            status={"error"}
                            style={styles.discussionpostWrapper}
                        />
                ) : (
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={null}
                            />
                        }
                    >
                        <ActivityIndicator color="red" style={styles.loading}/>
                    </ScrollView>
                )
                }
            </View>
        </SafeAreaView>
    );
};

export default Welcome;