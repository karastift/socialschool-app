import React, { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, StyleSheet, Animated, TouchableHighlight } from "react-native";
import { SubmitButton } from "./SubmitButton";

export const TextField = (props: {
  placeholder: string;
  onChangeText: (arg0: string) => void,
  password?: boolean,
  error: string,
  showValue?: string,
}) => {

  const [value, setValue] = useState('');

  return (
    <>
      { props.showValue
      ? (<SubmitButton
        onSubmit={() => null}
        style={styles.schoolHighlight}
        text={props.showValue}
        />)
      : null
      }
      <Text style={styles.error}>{props.error}</Text>
      <View style={styles.fieldWrapper}>
        <TextInput  
          placeholder={props.placeholder}
          placeholderTextColor='rgba(255, 255, 255, 0.5)'
          onChangeText={props.onChangeText}
          textAlign='center'
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='next'
          style={styles.field}
          secureTextEntry={props.password}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    height: 60,
    width: '90%',
    backgroundColor: 'rgb(50, 50, 50)',
    borderRadius: 50,
    justifyContent: 'center',
  },
  schoolHighlight: {
    height: 25,
    padding: 5,
    backgroundColor: 'grey',
    marginBottom: 20, 
  },
  error: {
    color: 'darkred',
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 20,
  },
  field: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
  },
});