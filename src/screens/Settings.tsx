import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SettingsButton from '../objects/SettingsButtons';
import styles from "../styles/SettingsStyles";


const Settings = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonWrapper}>
        <SettingsButton changeUsernameFn={null} variant="changeUsernameButton"/>
        <SettingsButton changeSchoolFn={null} variant="changeSchoolButton"/>
        {/* <NormalButton onPress={null} variant="costumButton" costumText="change password"/> */}
        <SettingsButton variant="aboutButton" color="red"/>
      </ScrollView>
    </View>
  );
};

export default Settings;