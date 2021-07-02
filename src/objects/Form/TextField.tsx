import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export const TextField = (props: {placeholder: string; onChangeText: (arg0: string) => void}) => {
  return (
    <>
      <Text style={styles.error}>{}</Text>
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
  error: {
    
  },
  field: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
  },
});