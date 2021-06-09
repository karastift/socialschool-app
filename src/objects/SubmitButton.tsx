import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SubmitButtonProps } from '../types/objectProps/SubmitButtonProps';

export const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>

      <Text style={styles.text}>{props.text}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor:'rgb(100, 0, 0)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: '800',
  },
});