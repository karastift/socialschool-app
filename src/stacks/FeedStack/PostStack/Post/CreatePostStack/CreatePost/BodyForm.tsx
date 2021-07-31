import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Keyboard, ScrollView } from "react-native";
import { Form } from "../../../../../../objects/Form/Form";
import { SubmitButton } from '../../../../../../objects/Form/FormElements/SubmitButton';
import { TextField } from '../../../../../../objects/Form/FormElements/TextField';
import { validateBody } from "../../../../../../utils/validateBody";

export const BodyForm = ({ navigation, route, setBody }: any) => {

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'>
      <View style={styles.inputView}>
        <Form
          buttonProps={{
            onSubmit: () => navigation.navigate('Status'),
            style: styles.submit,
          }}
          textFieldProps={{
            placeholder:'body',
            // multiline: true,
            onChangeText: (text) => setBody(text),
            error: route.params?.message,
          }}
          formProps={{
            validate: validateBody,
          }}
        />
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: 'rgb(26, 26, 26)',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
    color: 'white',
    marginTop: -30,
  },
  inputView: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    height: 40,
    width: 150,
    marginTop: 20,
  },
});