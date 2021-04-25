import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';

const Discussionpost = ({ navigation, route }) => {
    
    let [title, setTitle] = useState('');
    let [body, setBody] = useState('');

    useEffect(() => {
        // call to api
        setTitle('sjgjdfhsdhfkjsdhfkjlshjfksdhjkfsdjkhfkjlhfdasdasdasdasdjky'+route.params.id);
        setBody('sfhuisdhoifjiodsjyfiojiodsjfiodsjiofjoidhiuewhf    iusf'.repeat(20));
    }, []);

    const PostPreview = () => {
        
        return (
            <View style={styles.discussionpostWrapper}>
                <View style={styles.discussionpost}>
                    <Text style={styles.discussionpostTitle}>{title}</Text>
                    <Text> </Text>
                    <Text style={styles.discussionpostBody}>{body}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header} onPress={() => navigation.navigate('Welcome')}>Discuss My School</Text>
                <PostPreview/>
            </View>
        </SafeAreaView>
    );
};
export default Discussionpost;

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
        color: 'white',
        textAlign: 'left'
    },
    header: {
        zIndex: 2,
        width: windowWidth,
        color: 'red',
        paddingTop: 30,
        paddingBottom: 15,
        marginBottom: 15,
        marginLeft: 20,
        fontSize: 30,
        position: 'absolute',
        backgroundColor: 'rgb(26, 26, 26)',
    },
    discussionpostWrapper: {
        marginBottom: 10,
        marginTop: 100,
    },
    discussionpost: {
        color: 'white',
        backgroundColor: 'rgb(40, 40, 40)',
        alignItems: 'center',
        width: windowWidth-40,
        borderRadius: 24,
        textAlign: 'center',
        paddingRight: 6,
        paddingLeft: 6
        
    },
    discussionpostTitle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    discussionpostBody: {
        color: 'white',
        textAlign: 'center',
        paddingBottom: 10
    },
    load: {
        marginTop: '60%',
        marginBottom: '40%'
    }
});