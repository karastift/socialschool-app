import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Form } from "../../../../../objects/Form/Form";
import { validateValue } from "../../../../../utils/validateValue";

export const ValueForm: React.FC = ({ navigation, route, setValue }: any) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Form
          buttonProps={{
            onSubmit: () => navigation.navigate('Subject'),
            style: styles.submit,
          }}
          textFieldProps={{
            placeholder:'value',
            onChangeText: (text) => setValue(text),
            error: 'example:\nregular grade -> 0.4 = 40%\nor big exam -> 0.6 = 60%\nor if both are equally valuable -> 0.5 = 50%\nwrong values will mess up the calcut averages',
          }}
          formProps={{
            validate: validateValue,
          }}
        />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
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