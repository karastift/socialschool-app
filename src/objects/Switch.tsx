import React, { useEffect, useState } from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";

interface SwitchProps {
  name: string;
  onChangeValue: (arg0: string) => void
}

export const Switch: React.FC<SwitchProps> = (props) => {
  
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
    <TouchableHighlight style={styles.switchWrapper} onPress={toggleValue}>
      <Text style={styles.switchText}>{value}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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