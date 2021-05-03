import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


const DiscussionpostCreation = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={{color: 'white'}}>new discussion</Text>
    </View>
  );
};

export default DiscussionpostCreation;

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
        justifyContent: 'center'
    },
});