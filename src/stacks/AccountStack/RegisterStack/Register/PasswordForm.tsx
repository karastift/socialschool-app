import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SubmitButton } from "../../../../objects/Form/FormElements/SubmitButton";
import { TextField } from "../../../../objects/Form/FormElements/TextField";

export const PasswordForm: React.FC = ({ navigation, route, setPassword }: any) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextField placeholder='password' onChangeText={password => setPassword(password)} password error={route.params?.message}/>
        <SubmitButton onSubmit={() => navigation.navigate('School')} style={styles.submit}/>
      </View>
    </View>
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