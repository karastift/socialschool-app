import React from 'react';
import { StyleSheet, TouchableHighlight, Text, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

export type SubmitButtonProps = {
  style?: ViewStyle,
  icon?: string,
  text?: string,
  onSubmit: () => void,
};

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
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: '800',
    fontSize: 13,
  },
});