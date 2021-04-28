import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView, Button, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const host = 'http://192.168.178.113/api/';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const Welcome = ({ navigation, token }) => {

    let [discussionPostArray, setArray] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    let getData = async () => {
        try {
            if (token == 'noToken') {
                console.log('no token given');
            }
            else {
                let response = await fetch(
                    `${host}get_posts.php?token=${token}`, {
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

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerBackground}>
                    <Text style={styles.headerText}>Discuss My School</Text>
                    <Button
                        title="Go to Sign In"
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {discussionPostArray.map((post, index) => {
                        return (
                            <PostPreview key={index} body={post.data.discussionpostBody} title={post.data.discussionpostTitle} id={post.discussionpostId} />
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
        paddingTop: 30,
        paddingBottom: 5,
        marginBottom: 5
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