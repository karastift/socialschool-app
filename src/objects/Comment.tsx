import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface CommentProps {
	username: string;
	body: string;
	id: number;
}

const Comment: React.FC<CommentProps> = (props) => {
	const username = props.username;
	const body = props.body;
	const index = props.id;
	
	if (username.length != 0) {
		return (
			<View style={styles.commentWrapper} key={index}>
				<View style={styles.comment}>
					<Text style={styles.commentInfo}>{username}:</Text>
					<Text style={styles.commentBody}>{body}</Text>
				</View>
			</View>
		);
	}
	return (
		<View style={styles.commentWrapper}>
			<View style={styles.comment}>
				<Text style={styles.commentInfo}>{body}</Text>
			</View>
		</View>
	);
};

export default Comment;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	commentWrapper: {
		marginTop: 15,
	},
	comment: {
		color: 'white',
		backgroundColor: 'rgb(40, 40, 40)',
		width: windowWidth-40,
		borderRadius: 24,
		paddingRight: 6,
		paddingLeft: 6,
		alignSelf: 'center',
	},
	commentInfo: {
		color: 'white', // bdbdbd
		fontWeight: '600',
		textAlign: 'left',
		marginTop: 10,
		marginBottom: 5,
		marginLeft: 15
	},
	commentBody: {
		color: 'white', // #a3a3a3
		fontWeight: '700',
		textAlign: 'center',
		paddingBottom: 15
	},
});