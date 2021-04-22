import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function App() {
  let [quote, setQuote] = React.useState('');
  let [source, setSource] = React.useState('');
  let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTkwNjg2NjQsImV4cCI6MTYxOTA3MjI2NCwiaXNzIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9hcGlcLyIsImRhdGEiOnsiaWQiOiIxIiwidXNlcm5hbWUiOiJrYXJhIiwic2Nob29sIjoiTGVpYm5pei1HeW1uYXNpdW0gUG90c2RhbSJ9fQ.2wKkzkXTnuiskqvg34_FD75DCjsHmIGnwzvBhadc79c";

  const getData = async () => {
    try {
      let response = await fetch(
        'http://localhost/api/get_posts.php?token='+token,
      );
      let responseJson = await response.json();
      console.log(responseJson);
      setQuote(responseJson.message);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Native API Calls</Text>
      <Text>Example with fetch and Axios</Text>
      <TouchableHighlight onPress={getData}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Use Fetch API</Text>
        </View>
      </TouchableHighlight>
      <View>
        <Text>{quote}</Text>
        <Text>{source}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  }
});