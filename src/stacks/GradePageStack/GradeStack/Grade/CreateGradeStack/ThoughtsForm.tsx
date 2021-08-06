import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Form } from "../../../../../objects/Form/Form";
import { validateThoughts } from "../../../../../utils/validateThoughts";

export const ThoughtsForm: React.FC = ({ navigation, route, setThoughts, onSubmit }: any) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Form
          buttonProps={{
            onSubmit,
            style: styles.submit,
          }}
          textFieldProps={{
            placeholder:'thoughts',
            onChangeText: (text) => setThoughts(text),
            error: route.params?.message,
          }}
          formProps={{
            validate: validateThoughts,
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