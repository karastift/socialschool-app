import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Auth } from "../../../../../../contexts/Auth";
import { SubmitButton } from '../../../../../../objects/Form/FormElements/SubmitButton';
import { Switch } from "../../../../../../objects/Switch";

export const StatusForm = ({ navigation, route, setStatus, onSubmit }: any) => {

  const { user }: any = useContext(Auth);
  
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Switch name={user.school.schoolName} onChangeValue={setStatus}/>
        <SubmitButton onSubmit={onSubmit} style={styles.submit}/>
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
    marginTop: -30,
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
    marginTop: 20,
  },
});