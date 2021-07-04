import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
import { useMutation } from 'urql';
import { CommentAreaProps } from '../types/objectProps/CommentAreaProps';
import { SubmitButton } from './Form/SubmitButton';

export const CommentArea = (props: CommentAreaProps) => {

  const [value, setValue] = useState('');

  const submit = () => {
    props.onSubmit();
    setValue('');
    props.refresh();
  };

  return (
    <View style={props.style}>
      <TextInput
        style={styles.textInput}
        placeholder="What do you think about this?"
        placeholderTextColor="grey"
        textAlign="center"
        value={value}
        onChangeText={text => { props.onChangeText(text); setValue(text) }}
      />

      <SubmitButton onSubmit={value ? () => submit() : () => null} style={styles.submit}/>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    backgroundColor: 'rgb(26, 26, 26)',
    alignItems: 'center',
    width: windowWidth,
    color: 'white',
    paddingBottom: 20,
  },
  textInput: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 20,
    textAlign: 'center',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: '700',
  },
  submit: {
    height: 30,
    width: 80,
    backgroundColor: 'darkred',
    alignSelf: 'center',
    marginTop: 10,
  },
});