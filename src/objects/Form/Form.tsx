import React, { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { TextField, TextFieldProps } from "./FormElements/TextField";
import { SubmitButton, SubmitButtonProps } from "./FormElements/SubmitButton";

export interface FormProps {
  textFieldProps: TextFieldProps,
  buttonProps: SubmitButtonProps,
  formProps: {
    validate: (arg0: string) => string | undefined;
  },
};

export const Form: React.FC<FormProps> = (props) => {

  const { textFieldProps, buttonProps, formProps } = props;

  const [text, setText] = useState('');
  const [error, setError] = useState(textFieldProps.error);

  const onSubmit = () => {
    const textError = formProps.validate(text);
    if (textError) return setError(textError);


    buttonProps.onSubmit();
  };

  const onChangeText = (text: string) => {
    setText(text);
    textFieldProps.onChangeText(text);
  };

  return (
    <>
      <TextField {...textFieldProps} onChangeText={onChangeText} error={error}/>
      <SubmitButton {...buttonProps} onSubmit={onSubmit}/>
    </>
  );
};

const styles = StyleSheet.create({

});