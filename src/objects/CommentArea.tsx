import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { TextInput, View, StyleSheet, Dimensions } from 'react-native';
import { SubmitButton } from './Form/FormElements/SubmitButton';

interface CommentAreaProps {
	onSubmit: () => void;
	refresh: () => void;
	onChangeText: (arg0: string) => void;
	style: ViewStyle;
}

export const CommentArea: React.FC<CommentAreaProps> = (props) => {

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

      <SubmitButton onSubmit={value ? submit : () => null} style={styles.submit}/>
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
    backgroundColor: 'rgb(35, 35, 35)',
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
    alignSelf: 'center',
    marginTop: 10,
  },
});