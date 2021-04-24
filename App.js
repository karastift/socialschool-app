import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const PostPreview = (props) => {

    let title = props.title;
    let body = props.body.substring(0, 1600);
    let key = parseInt(props.index);
    return (
        <View key={key} style={styles.discussionpostWrapper}>
            <View key={'post'+key.toString()} style={styles.discussionpost}>
                <Text key={'title'+key.toString()} style={styles.discussionpostTitle}>{title}</Text>
                <Text key={'break'+key.toString()}> </Text>
                <Text key={'body'+key.toString()} style={styles.discussionpostBody}>{body}</Text>
                <Text key={'link'+key.toString()} style={styles.discussionpostLink}>read more</Text>
            </View>
        </View>
    );
};


const App = () => {
    let body = "this is the body this is the bodythis is the bodythis is the bodythis is the body".repeat(20)
    let [token, setToken] = useState('');
    let [discussionpostsArray, setDiscussionpostsArray] = useState([]);

    let post = discussionpostsArray[0];
    return (
        <View style={styles.container}>

            <Text style={styles.header}>Discuss My School</Text>
            
            <ScrollView>
                <PostPreview title="this is the title" body={body} index="0"></PostPreview>
            </ScrollView>
        </View>
    );
}

export default App;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(26, 26, 26)',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
        color: 'white'
    },
    header: {
        color: 'red',
        marginTop: 30,
        marginBottom: 30,
        fontSize: 30
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
        maxHeight: 700,
        overflow: 'hidden',
        borderRadius: 24,
        textAlign: 'center',
        paddingRight: 6,
        paddingLeft: 6
        
    },
    discussionpostTitle: {
        color: 'white',
        flex: 1,
        fontWeight: 'bold',
        marginTop: 10
    },
    discussionpostBody: {
        color: 'white',
        flex: 1
    },
    discussionpostLink: {
        width:  windowWidth-40,
        color: 'red',
        marginBottom: 5,
        paddingTop: 10,
        backgroundColor : 'rgb(40,40,40)',
        backgroundColor: 'linear-gradient(0deg, rgba(40,40,40,1) 39%, rgba(255,0,0,0) 100%)',
        textAlign: 'center'
    }
});