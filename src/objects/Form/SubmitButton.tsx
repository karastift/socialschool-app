import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import { SubmitButtonProps } from '../../types/objectProps/SubmitButtonProps';
import Icon from 'react-native-vector-icons/Feather'

export const SubmitButton = (props: SubmitButtonProps) => {

  return (
    <TouchableHighlight style={[styles.container, props.style]} onPress={props.onSubmit}>

      { !props.text
        ? (<Icon name={props.icon ? props.icon : 'arrow-right'} color='white' size={25}/>)
        : (<Text style={styles.text}>{props.text}</Text>)
      }

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
    color: 'rgb(170, 170, 170)',
    fontWeight: '800',
    fontSize: 13,
  },
});