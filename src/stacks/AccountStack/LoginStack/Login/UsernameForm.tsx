import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SubmitButton } from "../../../../objects/Form/SubmitButton";
import { TextField } from "../../../../objects/Form/TextField";

export const UsernameForm = ({ navigation, route, setUsername }: any) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextField placeholder='username' onChangeText={username => setUsername(username)}/>
        <SubmitButton onSubmit={() => navigation.navigate('Password', route.params)} style={styles.submit}/>
      </View>
    </View>
  );
};

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
  },
  inputView: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    height: 40,
    width: 150,
  },
});