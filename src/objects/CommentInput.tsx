import React, { useState } from "react";
import { useContext } from "react";
import { Platform, Keyboard, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, View, StyleSheet, ViewStyle } from "react-native";
import { ColorTheme } from "../contexts/ColorTheme";

interface CommentInputProps {
	onSubmit: () => void;
	refresh: () => void;
	onChangeText: (arg0: string) => void;
}

export const CommentInput: React.FC<CommentInputProps> = (props) => {

	const [value, setValue]	= useState('');
	const styles = useStyles();

  const submit = () => {
    props.onSubmit();
    setValue('');
    props.refresh();
  };

	const onChangeText = (text: string) => {
		props.onChangeText(text);
		setValue(text);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.inner}>
					<TextInput
						value={value}
						onChangeText={onChangeText}
						placeholder='What do you think about this?'
						placeholderTextColor='rgba(255, 255, 255, 0.5)'
						returnKeyType='send'
						returnKeyLabel='send'
						onSubmitEditing={submit}
						style={styles.textInput}
					/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const useStyles = () => {

	const colorTheme = useContext(ColorTheme)

	return StyleSheet.create({
		container: {
			flex: 1,
			marginBottom: 10,
		},
		inner: {
			flex: 1,
			justifyContent: 'flex-end',
		},
		textInput: {
			textAlign: 'center',
			height: 40,
			paddingHorizontal: 20,
			marginHorizontal: 10,
			backgroundColor: colorTheme.navigationTheme.colors.primary,
			borderRadius: 25,
			color: colorTheme.general.text,
		},
	});
};