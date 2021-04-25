import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Welcome = ({ navigation }) => {

    const PostPreview = (props) => {
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
                    <Text key={'link'+key.toString()} style={styles.discussionpostLink} onPress={() => navigation.navigate('Discussionpost', { id: id })}>read more</Text>
                </View>
            </View>
        );
    };
    
    let [discussionPostArray, setArray] = useState([]);
    
    useEffect(() => {
        // callApi();
        console.log('did not call api');
        setArray([
        {
            discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
            discussionpostBody: 'Das ist ein anderer Test 1. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
            discussionpostId: 1
        },
        {
            discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
            discussionpostBody: 'Das ist ein anderer Test 2. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
            discussionpostId: 2
        },
        {
            discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
            discussionpostBody: 'Das ist ein anderer Test 3 Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
            discussionpostId: 3
        },
        {
            discussionpostTitle: 'Ich bin so nice. Das ist ein Titel, der nur zum Test dient.',
            discussionpostBody: 'Das ist ein anderer Test 4. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test. Das ist ein anderer Test.',
            discussionpostId: 4
        },
        ]);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>

            <LinearGradient
                // Button Linear Gradient
                colors={['#4c669f', '#3b5998', '#192f6a']}>
                <Text style={styles.header}>Discuss My School</Text>
            </LinearGradient>

                <ScrollView style={styles.scrollView}>
                    {discussionPostArray.map((post, index) => {
                        return (
                            <PostPreview key={index} body={post.discussionpostBody.repeat(5)} title={post.discussionpostTitle} id={post.discussionpostId} />
                        );
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    async function callApi () {
        try {
            let response = await fetch('http://localhost/login.php', { // fix api call
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
            setArray([responseJson.token]);
            setLoadingState(false);
        }
        catch (error) {
            console.error(error);
        }
    }
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
    header: {
        zIndex: 2,
        width: windowWidth,
        color: 'red',
        paddingTop: 30,
        paddingBottom: 15,
        marginBottom: 15,
        fontSize: 30,
        position: 'absolute',
        backgroundColor: 'rgb(26, 26, 26)',
        
    },
    scrollView: {
        zIndex: 1,
        marginTop: 100,
    },
    discussionpostWrapper: {
        marginBottom: 10,
    },
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        borderRadius: 24,
        textAlign: 'center',
        alignItems: 'center',
        width: windowWidth-40,
        maxHeight: 700,
        overflow: 'hidden',
        paddingRight: 6,
        paddingLeft: 6
        
    },
    discussionpostTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10
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