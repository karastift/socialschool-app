import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from "../config.json";

import LoginButton from '../objects/LoginButton';
import LogoutButton from '../objects/LogoutButton';
import UserPageButton from '../objects/UserPageButton';
import CreateButton from '../objects/CreateButton';
import PostPreview from '../objects/PostPreview';

const Welcome = ({ navigation, route }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [discussionPostArray, setArray] = useState([{
        data : {
            discussionpostId: 1,
            discussionpostTitle: 'This is only a test post',
            discussionpostBody: 'This is the test body',
            discussionpostUsername: 'user123',
            discussionpostStatus: 'public',
        }
    }]);
 
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
                    {loggedIn != true ? (
                        <LoginButton style={styles.loginButton} onPress={()=>{navigation.navigate('Login');}}/>
                    ) : (
                        <LogoutButton style={styles.loginButton}/>
                    )}
                    <UserPageButton style={styles.userButton} onPress={()=>{UserPageButton>navigation.navigate('User');}}/>
                </LinearGradient>
                <CreateButton style={styles.createButton} onPress1={()=>{navigation.navigate('DiscussionpostCreation');}} onPress2={()=>{navigation.navigate('GradepostCreation');}}/>
                
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {discussionPostArray.map((post, index) => {
                        return (
                            <TouchableOpacity key={'forpress'+index.toString()} onPress={() => navigation.navigate('Discussionpost', { id: post.data.discussionpostId})}>
                                <PostPreview key={index} 
                                            body={post.data.discussionpostBody} 
                                            title={post.data.discussionpostTitle} 
                                            id={post.data.discussionpostId} 
                                            username={post.data.discussionpostUsername} 
                                            upvotes={post.data.discussionpostUpvotes}
                                            status={post.data.discussionpostStatus}
                                            style={styles.discussionpostWrapper}
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
    load: {
        marginTop: '60%',
        marginBottom: '40%'
    }
});