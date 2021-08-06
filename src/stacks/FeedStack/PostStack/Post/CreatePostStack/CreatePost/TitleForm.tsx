import React, { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Form } from "../../../../../../objects/Form/Form";
import { validateTitle } from "../../../../../../utils/validateTitle";

interface BodyFormProps {
  setTitle: Dispatch<SetStateAction<string>>;
  [key: string]: any;
}

export const TitleForm: React.FC<BodyFormProps> = ({ navigation, route, setTitle }) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Form
          buttonProps={{
            onSubmit: () => navigation.navigate('Text'),
            style: styles.submit,
          }}
          textFieldProps={{
            placeholder:'title',
            onChangeText: (text) => setTitle(text),
            error: route.params?.message,
          }}
          formProps={{
            validate: validateTitle,
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