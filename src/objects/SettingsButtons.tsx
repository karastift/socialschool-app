import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { CostumTextProps } from '../types/CostumTextProps';
import { SettingsButtonProps } from '../types/objectProps/SettingsButtonProps';

const SettingsButton = (props: SettingsButtonProps) => {
  const [open, setOpen] = useState(false);
  const variant = props.variant;

  if (variant === 'settingsButton') {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Icon name="setting" size={20} color={props.color ? props.color : "white"}/>
    </TouchableOpacity>
  );
  }
  else if (variant === 'changeSchoolButton') {
    if (!open) {
      return (
        <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
          <Text style={[styles.costumText, {color: props.color ? props.color : "white"}]}>change school</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <View>
          <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
            <Text style={[styles.costumText, {color: props.color ? props.color : "white"}]}>change school</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="new school"
            placeholderTextColor="grey"
            textAlign="center"
          />
          <TouchableOpacity style={[styles.container, {marginBottom: 20}]} onPress={props.changeUsernameFn}>
            <Text style={[styles.costumText, {color: 'darkred'}]}>change</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  else if (variant === 'changeUsernameButton') {
    if (!open) {
      return (
        <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
          <Text style={[styles.costumText, {color: props.color ? props.color : "white"}]}>change username</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <View>
          <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
            <Text style={[styles.costumText, {color: props.color ? props.color : "white"}]}>change username</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="new username"
            placeholderTextColor="grey"
            textAlign="center"
          />
          <TouchableOpacity style={[styles.container, {marginBottom: 20}]} onPress={props.changeUsernameFn}>
            <Text style={[styles.costumText, {color: 'darkred'}]}>change</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  else if (variant === 'aboutButton') {
    if (!open) {
      return (
          <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
            <Text style={[styles.costumText, {color: props.color ? props.color : "white"}]}>about Social School</Text>
          </TouchableOpacity>
      );
    }
    else {
      const CostumText = (props: CostumTextProps) => (
        <View>
          <Text style={[styles.costumText, {color: "white", fontWeight: "400", marginTop: 10,}]}>{props.what}:</Text>
          <Text style={[styles.costumText, {color: "white", fontWeight: "300", marginBottom: 10,}]}>Kian van der Meer</Text>
        </View>
      );
      return (
        <TouchableOpacity style={[styles.container, {height: 140}]} onPress={() => setOpen(!open)}>
          <CostumText what="app development"/>
          <CostumText what="server development"/>
        </TouchableOpacity>
    );
    }
  }
  else {
    throw new Error('no variant for given (SettingsButton.tsx)');
  }

};

export default SettingsButton;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 20,
    alignItems: 'center',
  },
  textInput: {
    width: '95%',
    height: 50,
    marginVertical: 10,
    marginLeft: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 20,
    textAlign: 'center',
    color: 'white',
  },
  costumText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
});