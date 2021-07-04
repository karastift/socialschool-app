import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Text, View, TextInput, StyleSheet, Animated } from "react-native";

export const TextField = (props: {placeholder: string; onChangeText: (arg0: string) => void, password?: boolean, error: string}) => {


  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, [props.error]);

  return (
    <>
      <Animated.Text style={{ ...styles.error, opacity: fadeAnim }}>{props.error}</Animated.Text>
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