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

const host = configData.serverData.serverUrl;
const getPostsUrl = configData.serverData.getPostsUrl;

const Welcome = ({ navigation, route }) => {
    const [discussionPostArray, setArray] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    const getStoredData = async () => {
        console.log('called');
        try {
            const tmpToken = await AsyncStorage.getItem('@token')
            const tmpGuestToken = await AsyncStorage.getItem('@guestToken')
            if (tmpToken != null) {
                setToken(JSON.parse(tmpToken));
                console.log('set token: '+token);
            }
            else if (tmpGuestToken !== null) {
                setToken(JSON.parse(tmpGuestToken));
                console.log('set guest token: '+token);
            }
            const tmpLoggedIn = await AsyncStorage.getItem('@loggedIn')
            if (tmpLoggedIn !== null) {
                setLoggedIn(JSON.parse(tmpLoggedIn));
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const storeData = async (key, value) => {
        console.log('storing...' + value);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        }
        catch (e) {
            console.error(e);
        }
    }

    const setGuestToken = async () => {
        try {
            const tmpGuestToken = await AsyncStorage.getItem('@guestToken')
            if (tmpGuestToken != null) {
                setToken(JSON.parse(tmpGuestToken));
                console.log('set guestt token: '+tmpGuestToken);
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    async function logout () {
        storeData('@token', '')
        .then(storeData('@loggedIn', false))
        .then(setGuestToken())
        .then(setLoggedIn(false));
    }

    let getData = async () => {
        if (token.length != 0) {
            console.log('got token: '+token)
            try {
                let response = fetch(
                    `${host}${getPostsUrl}?token=${token}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                                'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then((data) => {
                    setArray(data.postData);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
        else {console.log('no token yet');}
    }
    
    useEffect(()=>{ getStoredData() }, [route.params]);
    useEffect(()=>{ getData(); }, [token]);

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
                        <LogoutButton style={styles.loginButton} onPress={()=>{logout();}}/>
                    )}
                    <UserPageButton style={styles.userButton}/>
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