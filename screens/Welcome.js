import React, { useState, useEffect } from 'react';
import { DevSettings, StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configData from "../config.json";
import { createIconSetFromFontello } from 'react-native-vector-icons';

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
            <View key={key} style={styles.discussionpostWrapper}>
                <View key={'post'+key.toString()} style={styles.discussionpost}>
                    <Text key={'title'+key.toString()} style={styles.discussionpostTitle}>{title}</Text>
                    <Text key={'break'+key.toString()}> </Text>
                    <Text key={'body'+key.toString()} style={styles.discussionpostBody}>{body}...</Text>
                    <Text key={'info'+key.toString()} style={styles.discussionpostInfo}>posted by {username} | {status} | {upvotes}</Text>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerBackground}>
                    <Text style={styles.headerText}>Discuss My School</Text>
                    {loggedIn != true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity 
                            onPress={() => {logout();}} 
                            style={styles.loginButton}>
                            <Text style={styles.loginText}>Logout</Text>
                        </TouchableOpacity>
                    )}
                </View>
                
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
        fontSize: 30,
        
    },
    loginButton: {
        width: 55,
        backgroundColor:'rgb(40, 40, 40)',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 43,
        right: 40
    },
    loginText: {
        color: 'grey',
        fontWeight: 'bold'
    },
    headerBackground: {
        width: windowWidth,        
        position: 'absolute',
        paddingTop: 50,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap'
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
        paddingHorizontal: 6
        
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
    load: {
        marginTop: '60%',
        marginBottom: '40%'
    }
});