import React, { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, StyleSheet, Animated, TouchableHighlight } from "react-native";
import { PostInput } from "../../../types/PostInput";
import { SubmitButton } from "./SubmitButton";

export type TextFieldProps = {
  placeholder: string;
  onChangeText: (arg0: string) => void,
  password?: boolean,
  error: string,
  showValue?: string,
  multiline?: boolean,
};

export const TextField = (props: TextFieldProps) => {

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
      <View style={{ 
        ...styles.fieldWrapper,
        height: props.multiline ? 200 : 60,
        borderRadius: props.multiline ? 40 : 50,
        }}>
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
          multiline={props.multiline}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    height: 60,
    width: '95%',
    backgroundColor: 'rgb(50, 50, 50)',
    borderRadius: 50,
    justifyContent: 'center',
    overflow: 'hidden',
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