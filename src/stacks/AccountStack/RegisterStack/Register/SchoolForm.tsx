import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SubmitButton } from "../../../../objects/Form/SubmitButton";
import { TextField } from "../../../../objects/Form/TextField";

export const SchoolForm = ({ navigation, route, setSchool, onSubmit }: any) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <SubmitButton onSubmit={() => navigation.navigate('Password')} icon='arrow-left' style={styles.back}/>
        <TextField placeholder='school' onChangeText={school => setSchool(school)} error={route.params?.message}/>
        <SubmitButton onSubmit={() => onSubmit()} style={styles.submit}/>
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
  back: {
    position: 'absolute',
    top: 0,
    left: 10,
    marginTop: 50,
    height: 40,
    width: 60,
    backgroundColor: 'rgb(50, 50, 50)',
  },

});