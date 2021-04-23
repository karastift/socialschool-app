import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Button, Dimensions, useEffect } from 'react-native';

export default function App() {
    let [token, setToken] = React.useState('');
    let [discussionpostsArray, setDiscussionpostsArray] = React.useState([]);
    
    async function loginAsGuest() {
        try {
            let response = await fetch('http://localhost/login.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  guest: true
                })
              });
            let responseJson = await response.json();
            console.log(responseJson);
            setToken(responseJson.token);
        }
        catch (error) {
            console.error(error);
        }
    }       
    async function getData() {
        try {
            if (!token) {
                loginAsGuest();
                console.log(token);
            }
            let response = await fetch(
                'http://localhost/api/get_posts.php?token='+token,
            );
            let responseJson = await response.json();
            console.log(responseJson);
            setDiscussionpostsArray(responseJson.postData);
            return responseJson;
        }
        catch (error) {
            console.error(error);
        }
    }
    function ShowPosts() {
        if (discussionpostsArray.length > 0) {
            discussionpostsArray.map((post, index) => {

                return (
                    <View key={index} style={styles.discussionpostWrapper}>
                        <View key={'post'+index.toString()} style={styles.discussionpost}>
                            <Text key={'title'+index.toString()} style={styles.discussionpostTitle}>{post.data.discussionpostTitle}</Text>
                            <Text key={'break'+index.toString()}> </Text>
                            <Text key={'body'+index.toString()} style={styles.discussionpostBody}>{post.data.discussionpostBody}</Text>
                            <Text key={'link'+index.toString()} style={{color:'red'}}>read more</Text>
                        </View>
                    </View>
                );
            });
        }
        else {
            return (
                <View style={styles.discussionpostWrapper}>
                    <View style={styles.discussionpost}>
                        <Text style={styles.discussionpostTitle}>No posts available.</Text>
                    </View>
                </View>
            );
        }
    }
    return (
        <View style={styles.container}>

            <Text style={styles.header} onPress={getData}>Discuss My School</Text>
            
            <ScrollView>
                <ShowPosts></ShowPosts>
            </ScrollView>
        </View>
        );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(26, 26, 26)',
        alignItems: 'center',
        //justifyContent: 'center',
        width: windowWidth,
        color: 'white'
    },
    discussionpostWrapper: {
        marginBottom: 10
    },
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        alignItems: 'center',
        width: windowWidth-40,
        height: 'fit-content',
        maxHeight: 200,
        overflow: 'hidden',
        borderRadius: 24,
        textAlign: 'center'
        
    },
    header: {
        color: 'red',
        marginTop: 40,
        marginBottom: 10,
        fontSize: 30
    },
    discussionpostTitle: {
        color: 'white',
        flex: 1
    },
    discussionpostBody: {
        color: 'white',
        flex: 1
    }
});