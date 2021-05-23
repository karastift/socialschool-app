import React, { useState } from 'react';
import { Text, StyleSheet, Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateButton = (props) => {
    const [isOpen, setOpen] = useState(false);

    if (!isOpen) {
        return (
                <TouchableOpacity style={[props.style, styles.createButton]} onPress={()=>{setOpen(true);}}>
                    <Text style={styles.loginText}>+</Text>
                </TouchableOpacity>
        );
    }
    else {
        return (
            <View>            
                <TouchableOpacity style={[props.style, styles.createButton]} onPress={()=>{setOpen(false);}}>
                    <Text style={styles.loginText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.createOption, styles.createButton]} onPress={props.onPress1}>
                    <Text style={styles.loginText}>new discussion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.createOption, styles.createButton]} onPress={props.onPress2}>
                    <Text style={styles.loginText}>new grade</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default CreateButton;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    createButton: {
        backgroundColor:'rgb(40, 40, 40)',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createOption: {
        width: 200,
        marginTop: 10,
        marginLeft: 70,
        height: 30,
    },
    loginText: {
        color: 'grey',
        fontWeight: 'bold',
    },
});