import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';


const Login = ({ navigation, onSignIn }) => {
  return (
    <View style={styles.container}>
        <Text>Public Sign In Screen</Text>
        <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
};

export default Login;

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
    }
});