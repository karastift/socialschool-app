import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Auth } from "../../../../../../contexts/Auth";
import { SubmitButton } from '../../../../../../objects/Form/FormElements/SubmitButton';

const Switch = (props: { name: string, onChangeValue: (arg0: string) => void }) => {
  
  const [value, setValue] = useState(props.name);

  useEffect(() => {
    props.onChangeValue(props.name);
  }, []);

  const toggleValue = () => {
    const newVal = value === 'public' ? props.name : 'public';
    setValue(newVal);
    props.onChangeValue(newVal);
  };

  return (
    <TouchableHighlight style={s.switchWrapper} onPress={toggleValue}>
      <Text style={s.switchText}>{value}</Text>
    </TouchableHighlight>
  );
};

const s = StyleSheet.create({
  switchWrapper: {
    height: 50,
    width: '95%',
    backgroundColor: 'rgb(50, 50, 50)',
    borderRadius: 50,
    justifyContent: 'center',
  },
  switchText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
  },
});

export const StatusForm = ({ navigation, route, setStatus, onSubmit }: any) => {

  const { user }: any = useContext(Auth); // fix undefined school bug
  console.log(user);
  
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Switch name={'Leibniz-Gymnasium Potsdam'} onChangeValue={setStatus}/>
        <SubmitButton onSubmit={onSubmit} style={styles.submit}/>
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