import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import { SubmitButtonProps } from '../../types/objectProps/SubmitButtonProps';
import Icon from 'react-native-vector-icons/Feather'

export const SubmitButton = (props: SubmitButtonProps) => {

  return (
    <TouchableHighlight style={[styles.container, props.style]} onPress={props.onSubmit}>

      <Icon name='arrow-right' color='white' size={25}/>

    </TouchableHighlight>
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